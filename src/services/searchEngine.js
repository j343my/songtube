import  LastFM from 'last-fm';
import config from '../config';

class SearchEngine {
  constructor() {
    this.lastFM = new LastFM(config.lastFMKey, { userAgent: 'MyApp/1.0.0 (http://example.com)' });
  }
  search(q) {
    return new Promise(resolve => {
      this.lastFM.search({ q }, (err, data) => {
          if (err) console.error(err)
          resolve(data);
      })
    })
  }
}

export default new SearchEngine();
