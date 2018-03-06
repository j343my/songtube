import React, { Component } from 'react';
import MusicIO from './services/musicIO';
import SearchEngine from './services/searchEngine';
import { slide as Menu } from 'react-burger-menu'
import Searcher from './components/Searcher';
import Player from './components/Player';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      videos: [],
      tracks: [],
      albums: [],
      artists: [],
      top: {},
      percentage: 0,
      play: false,
      menuOpen: false,
      currentIndex: 0,
    };

    this.onSearch = this.onSearch.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.onMenuStateChange = this.onMenuStateChange.bind(this);
    this.shouldDisableOverlayClick = this.shouldDisableOverlayClick.bind(this);
    this.nextSong = this.nextSong.bind(this);
    this.prevSong = this.prevSong.bind(this);
    this.setSong = this.setSong.bind(this);
  }

  async componentDidMount() {
    const topChart = await SearchEngine.topChart();
    console.log(topChart);
    await this.onSearch({
      result: {
        tracks: topChart.track,
      }
    });
  }

  async onSearch(response) {
    if(response) {
      const videos = await MusicIO.cleverSong(response.result.tracks[this.state.currentIndex]);
      this.setState({
        videos,
        tracks: response.result.tracks,
        percentage: 0,
        currentIndex: 0,
        play: true,
      });
    }
  }

  async nextSong() {
    await this.setSong(this.state.currentIndex + 1);
  }

  async prevSong() {
    if(this.state.currentIndex) {
      await this.setSong(this.state.currentIndex - 1);
    }
  }

  async setSong(index) {
    const videos = await MusicIO.cleverSong(this.state.tracks[index]);
    this.setState({
      videos,
      percentage: 0,
      play: true,
      currentIndex: index,
    });
  }

  showMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    })
  }

  onMenuStateChange(state) {
    const { isOpen } = state;
    if(this.state.menuOpen !== isOpen) {
      this.setState({
        menuOpen: isOpen,
      });
    }
  }

  shouldDisableOverlayClick() {
   return !this.state.menuOpen
  }

  render() {
    const { play, videos, top, tracks, menuOpen, currentIndex } = this.state;
    const player = play ? (
      <Player
        items={videos}
        artist={top}
        tracks={tracks}
        currentIndex={currentIndex}
        nextSong={this.nextSong}
        prevSong={this.prevSong}
      />
    ) : '';
    return (
      <div className="App">
        {player}
        <header className="App-header">
          <Searcher onSearch={this.onSearch}/>
          <i className="material-icons playListButton" onClick={ this.showMenu }>playlist_play</i>
        </header>
        <main>
          <Menu
            right
            isOpen={menuOpen}
            onStateChange={this.onMenuStateChange}>
            {
              tracks.map((track, index) => (
                <div className="menuItem" onClick={() => this.setSong(index)}>
                  <div className="itemsContainer">
                    <p className="SongTitle">{track.name}</p>
                    <p className="ArtistNameTitle">{!!track.artistName ? track.artistName : track.artist.name}</p>
                  </div>
                  <div className="imageMenuContainer">
                    <div className="imageMenu" style={{ backgroundImage: `url(${!!track.images ? track.images[0] : track.image[0]['#text']
})` }}>
                    {
                      index !== currentIndex ?
                        (<i className="material-icons player-icon">play_arrow</i>) :
                        (<i className="material-icons player-icon">pause</i>)
                    }
                    </div>
                  </div>
                </div>
              ))
            }
          </Menu>
        </main>
      </div>
    );
  }
}

export default App;
