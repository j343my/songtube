import React, { Component } from 'react';

import '../App.css';

class PlayerControls extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { track, nextSong, prevSong } = this.props;
    return (
      <div className="PlayerInfo">
        <h3 className="SongTitle">{track.name}</h3>
        <h4 className="ArtistNameTitle">{!!track.artistName ? track.artistName : track.artist.name}</h4>
        <div className="playerButtons">
          <i className="material-icons player-icon" onClick={prevSong}>skip_previous</i>
          <i className="material-icons player-icon">play_arrow</i>
          <i className="material-icons player-icon" onClick={nextSong}>skip_next</i>
        </div>
      </div>
    );
  }
}

export default PlayerControls;
