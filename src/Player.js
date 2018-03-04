import React, { Component } from 'react';
import YTPlayer from 'yt-player';
import './App.css';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const player = new YTPlayer('#player', {
      width: window.innerWidth,
      height: window.innerHeight,
    });
    player.load(this.props.items[0].id);
    player.play();
    player.setVolume(100);
  }

  render() {
    return (
      <video id="player" />
    );
  }
}

export default Player;
