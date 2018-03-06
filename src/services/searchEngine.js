import  LastFM from 'last-fm';
import geocoder from 'geocoder';
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

  topChart() {
    return new Promise(resolve => {
      if ("geolocation" in navigator) {
       navigator.geolocation.getCurrentPosition((location) => {
         geocoder.reverseGeocode( location.coords.latitude, location.coords.longitude, (err, geo) => {
           const country = geo.results[geo.results.length -1].formatted_address;
           this.lastFM.geoTopTracks({ country }, (err, data) => {
               if (err) console.error(err)
               resolve(data);
           })
         }, { language: 'en', key: 'AIzaSyBFQPvs3it8S6H3EPkrXkBjCj6s2XFxNkc' });
       })
      }
    })
  }
}

export default new SearchEngine();
