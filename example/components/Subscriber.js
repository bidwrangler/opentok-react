import React, { Component } from 'react';


export default class Subscriber extends Component {
  constructor(props) {
    super(props);

    this.state = { label: 'Audio Subscriber' };
  }

  play = async () => {
    await Promise.resolve('async!')
    this.initiate()
  }

  initiate = () => {
    this.setState(state => ({ label: 'Initiating session...' }))
    this.session = OT.initSession(this.props.apiKey, this.props.sessionId)
    // this.session.on('streamPropertyChanged', this.handleStreamPropertyChanged)
    this.session.on('streamCreated', this.subscribe)
    if (this.session.currentState === 'disconnected') {
      this.session.connect(this.props.token, err => {
        console.error('connect error', err)
        this.setState({ label: 'Failed to connect' })
      })
    }
    console.log('Session', this.session)
  }

  subscribe = ev => {
    console.log('Subscribing to stream', ev.stream)
    this.setState(state => ({ label: 'Subscribing to stream...'}))
    this.subscriber = this.session.subscribe(
      ev.stream,
      {
        subscribeToAudio: true,
        insertDefaultUI: false // we don't want OpenTok's UI, we'll use our own
      },
      this.handleSubscribedToStream()
    )
    this.subscriber.once('audioLevelUpdated', () => {
      console.log('Audio level was updated')
      // for some reason sometimes we receive audio before session.subscribe callback is called, so this is the
      // alternative place where we can access received mediaStream
      this.handleStreamReceived()
    })
  }

  // handleStreamPropertyChanged = () => {
  //   return ({ changedProperty, newValue }) => {
  //     console.log('Changing prop to', changedProperty, newValue)
  //     this.setState({
  //       [changedProperty]: newValue
  //     })
  //   }
  // }

  handleSubscribedToStream = err => {
    console.log('Stream was subscribed')
    if (err) {
      console.error('subscribe error', err)
      this.setState({ label: 'Failed to subscribe' });
    } else {
      this.handleStreamReceived()
      // if (this.props.setStateOnSubscribe) {
      //   console.log('Changing state after subscribe')
      //   this.setState(() => ({ label: 'Audio Subscriber FTW!' }))
      // }
    }
  }

  handleStreamReceived = () => {
    if (this.isStreamReceived) return
    console.log('Stream was received')
    this.isStreamReceived = true
    if (this.props.setStateOnSubscribe) {
      console.log('Changing state after subscribe')
      this.setState(() => ({ label: 'Audio Subscriber FTW!' }))
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.play}>Play now</button>
        {this.state.label}
      </div>
    );
  }
}
