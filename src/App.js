import React, { Component } from 'react';
import MusicIO from './services/musicIO';
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
    };

    this.onSearch = this.onSearch.bind(this);
    this.showMenu = this.showMenu.bind(this);
    this.onMenuStateChange = this.onMenuStateChange.bind(this);
    this.shouldDisableOverlayClick = this.shouldDisableOverlayClick.bind(this);
  }

  async onSearch(response) {
    console.log(response);
    if(response) {
      this.setState({
        videos: await MusicIO.cleverSong(response.result),
        tracks: response.result.tracks,
        albums: response.result.albums,
        artists: response.result.artists,
        top: response.result.top,
        percentage: 0,
        play: true,
      });
    }
  }

  showMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    })
  }

  onMenuStateChange(state) {
    const { isOpen } = state;
    if(this.state.menuOpen !== isOpen) {
      console.log(isOpen);
      this.setState({
        menuOpen: isOpen,
      });
    }
  }

  shouldDisableOverlayClick() {

   return !this.state.menuOpen
  }

  render() {
    const { play, videos, top, tracks, menuOpen } = this.state;
    console.log(menuOpen)
    const player = play ? (<Player items={videos} artist={top} tracks={tracks}/>) : '';
    return (
      <div className="App">
        {player}
        <header className="App-header">
          <Searcher onSearch={this.onSearch}/>
          <i className="material-icons playListButton" onClick={ this.showMenu }>playlist_play</i>
        </header>
        <main>
          <Menu right
              isOpen={menuOpen}
              onStateChange={this.onMenuStateChange}>
            </Menu>
        </main>
      </div>
    );
  }
}

export default App;
