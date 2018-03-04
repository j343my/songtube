import youtubeSearchEngine from 'youtube-search';
import config from '../config';

class Youtube {
  search(track) {
    return new Promise(resolve => {
      var opts = {
        maxResults: 10,
        key: config.youtubeKey
      };
      youtubeSearchEngine(track, opts, function(err, results) {
        if(err) return console.log(err);
        resolve(results);
      });
    })
  }
}

export default new Youtube();
