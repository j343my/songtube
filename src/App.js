import React, { Component } from 'react';
import MusicIO from './services/musicIO';

import Searcher from './Searcher';
import Player from './Player';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      tracks: [],
      albums: [],
      artists: [],
      play: false,
    };

    this.onSearch = this.onSearch.bind(this);
  }

  async onSearch(response) {
    this.setState({
      videos: await MusicIO.cleverSong(response.result),
      tracks: response.result.tracks,
      albums: response.result.albums,
      artists: response.result.artists,
      play: true,
    });
  }

  render() {
    const { play, videos } = this.state;
    console.log(Player);
    const player = play ? (<Player items={videos}/>) : '';
    return (
      <div className="App">
        {player}
        <header className="App-header">
          <Searcher onSearch={this.onSearch}/>
        </header>
        <main>
        </main>
      </div>
    );
  }
}

export default App;
