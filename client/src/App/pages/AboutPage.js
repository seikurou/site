import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap'
import FadeIn from 'react-fade-in';
import json from './text.json'



class AboutPage extends Component {
  componentDidMount() {
    document.title = 'About'
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Jumbotron className="mt-3" >
            <div className="container">
              <FadeIn>
                <div className="row justify-content-center align-items-center mb-5">
                  <div className="col-sm-6 col-lg-4">
                    <h1 className="display-4">About</h1>
                  </div>
                  <div className="col-sm-6 col-lg-4">
                    <img src="/assets/me.jpg" alt="Me" className="img-fluid d-block mx-auto rounded-circle" />
                  </div>
                </div>
                {json.about.map((para, i) => {
                  return (
                    <div key={i} className="row justify-content-center">
                      <div className="col-lg-8">
                        <p className="lead">{para}</p>
                      </div>
                    </div>
                  )
                }
                )}
              </FadeIn>
            </div>
          </Jumbotron>
        </div>
      </div>
    );
  }
}
export default AboutPage;