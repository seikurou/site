import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import json from './text.json'
import ImageGallery from 'react-image-gallery';

import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";

class ArtPage extends Component {
  componentDidMount() {
    document.title = 'Projects'
  }
  render() {
    return (
      <div className="App">
        <h1 className="display-4 text-center">Misc</h1>
        <p className="text-center">{json.galleryMsg}</p>
        <div className="fluid-container" style={{ overflowX: "hidden" }}>
          <FadeIn>
            <div className="row justify-content-center ">
              <div className="col-11 col-md-10">
                <ImageGallery items={json.gallery} showFullscreenButton={false} showPlayButton={false} />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }
}
export default ArtPage;