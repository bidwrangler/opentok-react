import React, { Component } from 'react';

import { OTPublisher } from '../../src'
import CheckBox from './CheckBox';

export default class Publisher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      audio: true,
      video: false
    };
  }

  setAudio = (audio) => {
    this.setState({ audio });
  }

  setVideo = (video) => {
    this.setState({ video });
  }

  onError = (err) => {
    this.setState({ error: `Failed to publish: ${err.message}` });
  }

  render() {
    return (
      <div>
        {this.state.error ? <div>{this.state.error}</div> : null}
        <OTPublisher
          properties={{
            publishAudio: this.state.audio,
            publishVideo: this.state.video,
          }}
          onError={this.onError}
        />
        <CheckBox
          label="Publish Audio"
          checked={this.state.audio}
          onChange={this.setAudio}
        />
        <CheckBox
          label="Publish Video"
          checked={this.state.video}
          onChange={this.setVideo}
        />
      </div>
    );
  }
}
