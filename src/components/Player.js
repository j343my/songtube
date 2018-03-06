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
  }

  setPlayer(item) {
    this.player.load(item.id);
    this.player.play();
    this.player.setVolume(100);
  }

  registerEvents(props) {
    this.player.on('ended', () => {
      props.nextSong()
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
    this.setPlayer(this.props.items[this.props.currentIndex]);
    this.registerEvents(this.props);
  }

  componentDidUpdate(prevProps) {
    const actualTrack = `${this.props.tracks[this.props.currentIndex].name} - ${this.props.tracks[this.props.currentIndex].artistName}`;
    const prevTrack = `${prevProps.tracks[prevProps.currentIndex].name} - ${prevProps.tracks[prevProps.currentIndex].artistName}`;

    if (actualTrack != prevTrack) {
      this.setPlayer(this.props.items[0]);
    }
  }

  render() {
    const { percentage } = this.state;
    const { artist, tracks, nextSong, prevSong, currentIndex } = this.props;
    return (
      <React.Fragment>
        <div className="PlayerControls">
          <ArtistPreview
            percentage={percentage}
            artist={tracks[currentIndex]}
          />
          <PlayerControls
            track={tracks[currentIndex]}
            artist={artist}
            nextSong={nextSong}
            prevSong={prevSong}
          />
        </div>
        <video id="player" />
      </React.Fragment>
    );
  }
}

export default Player;
