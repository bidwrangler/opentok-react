import React, { Component } from 'react';

import { OTSession, OTStreams, preloadScript } from '../../src'
import CheckBox from './CheckBox';
import ConnectionStatus from './ConnectionStatus';
import Publisher from './Publisher';
import Subscriber from './Subscriber';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connected: false,
      publish: false,
      subscribe: false,
      setStateOnSubscribe: false
    };

    this.sessionEvents = {
      sessionConnected: () => {
        this.setState({ connected: true });
      },
      sessionDisconnected: () => {
        this.setState({ connected: false });
      }
    };
  }

  toggleSubscriber = () => {
    this.setState(({ subscribe }) => ({ subscribe: !subscribe}));
  }

  togglePublisher = () => {
    this.setState(({ publish }) => ({ publish: !publish}));
  }

  setSetStateOnSubscribe = (setStateOnSubscribe) => {
    this.setState({ setStateOnSubscribe });
  }

  onError = (err) => {
    this.setState({ error: `Failed to connect: ${err.message}` });
  }

  render() {
    return (
      <div>
        <h4>Publisher</h4>
        <button onClick={this.togglePublisher}>Toggle publisher</button>
        {
          this.state.publish &&
            <OTSession
              apiKey={this.props.apiKey}
              sessionId={this.props.sessionId}
              token={this.props.token}
              eventHandlers={this.sessionEvents}
              onError={this.onError}
          >
            {this.state.error ? <div>{this.state.error}</div> : null}
            <ConnectionStatus connected={this.state.connected} />
            <Publisher />
          </OTSession>
        }

        <h4>Subscriber</h4>
        <CheckBox
          label="Set component state during onSubscribe callback?"
          value={this.state.setSetStateOnSubscribe}
          onChange={this.setSetStateOnSubscribe}
        />
        <button onClick={this.toggleSubscriber}>Toggle subscriber</button>
        <br /><br />
        {this.state.subscribe &&
          <Subscriber
            apiKey={this.props.apiKey}
            sessionId={this.props.sessionId}
            token={this.props.token}
            setStateOnSubscribe={this.state.setStateOnSubscribe} />
        }
      </div>
    );
  }
}

export default preloadScript(App);
