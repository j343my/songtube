import Youtube from './youtube';

class MusicIO {
  async cleverSong(track) {
    let query = `${track.artistName} - ${track.name}`;
    let song = await Youtube.search(query);
    return song;
  }
}

export default new MusicIO();
