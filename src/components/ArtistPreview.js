import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../App.css';

class ArtistPreview extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { artist, percentage } = this.props;
    if(!artist.images) {
      return false;
    }
    const image = artist.images[artist.images.length - 1]

    return (
      <React.Fragment>
        <div className="ArtistPreview">
            <div style={{ position: 'absolute', width: '100%' }}>
              <CircularProgressbar
                percentage={percentage}
                textForPercentage={null}
                strokeWidth="4"
              />
            </div>
            <div style={{ width: '100%', borderRadius: '50%', overflow: 'hidden'}}>
                 <img style={{ width: '95%' }} src={image} />
            </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ArtistPreview;
