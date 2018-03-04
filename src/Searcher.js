import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import SearchEngine from './services/searchEngine';

import './App.css';

class Searcher extends Component {
  constructor(props) {
    super(props);
    this.search = debounce(this.search, 1000);
  }

  async search(event) {
    let data = await SearchEngine.search(event.target.value);
    this.props.onSearch(data);
  }

  render() {
    return (
      <input onChange={e => this.search(e.persist()||e)} />
    );
  }
}

export default Searcher;
