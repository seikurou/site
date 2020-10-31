import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron } from 'reactstrap'
import FadeIn from 'react-fade-in';
// import { json } from 'express';
import json from './text.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

class HomePage extends Component {
  componentDidMount() {
    document.title = 'Home'
  }
  render() {
    return (
      <div className="App">

        <div className="d-flex flex-column bg-dark justify-content-center text-center" style={{ overflowX: "hidden", height: "100vh" }} >
          <FadeIn>
          <div className="container"   >
            <div className="row justify-content-center text-white align-items-center" >
              <div className="col-md-4">
                <h1 className="display-2">Hello!</h1>
              </div>
              <div className="col-sm-10 col-md-4">
                <h2>{json.introSentence}</h2>
                <p className="lead text-primary">{json.headline}</p>
              </div>
            </div>
          </div>
          <div className="container mt-5">
            <div className="row">
              <div className="col">
                <a href={"mailto:" + json.email} target="_blank"><FontAwesomeIcon icon={faEnvelope} size="3x" className="mr-3 text-white" /></a>
                <a href={json.linkedin} target="_blank"><FontAwesomeIcon icon={faLinkedin} size="3x" className="mr-3 text-white" /></a>
                <a href={json.github} target="_blank"><FontAwesomeIcon icon={faGithub} size="3x" className="text-white" /></a>
              </div>
            </div>
          </div>
          </FadeIn>
        </div>




      </div>

    );
  }
}
export default HomePage;