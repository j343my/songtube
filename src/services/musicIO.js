import Youtube from './youtube';

class MusicIO {
  async cleverSong(results) {
    let track = results.tracks[0];
    let query = `${track.artistName} - ${track.name}`;
    let song = await Youtube.search(query);
    return song;
  }
}

export default new MusicIO();
