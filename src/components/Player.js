import React, { Component } from 'react';
import YTPlayer from 'yt-player';
import ArtistPreview from './ArtistPreview';
import PlayerControls from './PlayerControls';
import '../App.css';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percentage: 0,
    }
    // PLAYER
    this.player = null;
    this.currentIndex = 0;
  }

  setPlayer(item) {
    this.player.load(item.id);
    this.player.play();
    this.player.setVolume(100);
  }

  registerEvents() {
    this.player.on('ended', () => {
      this.currentIndex++;
      this.setPlayer(this.props.items[this.currentIndex]);
    })
    this.player.on('timeupdate', (seconds) => {
      const percentage = seconds * 100 / this.player.getDuration();
      this.setState({
        percentage
      })
    });

  }


  componentDidMount() {
     this.player = new YTPlayer('#player', {
      width: window.innerWidth,
      height: window.innerHeight,
      controls: false,
      captions: false,
      annotations: false,
      info: false,
    });
    this.setPlayer(this.props.items[this.currentIndex]);
    this.registerEvents(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.items[this.currentIndex] != prevProps.items[this.currentIndex]) {
      this.setPlayer(this.props.items[this.currentIndex]);
    }
  }

  render() {
    const { percentage } = this.state;
    const { artist, tracks } = this.props;
    console.log(percentage)
    return (
      <React.Fragment>
        <div className="PlayerControls">
          <ArtistPreview
            percentage={percentage}
            artist={artist}
          />
          <PlayerControls
            track={tracks[this.currentIndex]}
            artist={artist}
          />
        </div>
        <video id="player" />
      </React.Fragment>
    );
  }
}

export default Player;
