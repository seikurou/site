import React, { Component } from 'react';
import FadeIn from 'react-fade-in';
import json from './text.json'
import { Link } from 'react-router-dom';


class ProjectsPage extends Component {
  componentDidMount() {
    document.title = 'Projects'
  }
  render() {
    return (
      <div className="App">
        <h1 className="display-4 text-center">Projects</h1>
        <p className="text-center">Some of my best work.</p>
        <div className="fluid-container" style={{ overflowX: "hidden"}}>
          <FadeIn>
            <div className="row justify-content-center ">
              <div className="col-10 col-lg-8 col-xl-10 ">
                <div className="fluid-container">
                  <div className="row justify-content-center align-items-center">
                    {json.projects.map((proj, i) => {
                      return (
                        <div key={i} className="col-lg-6 col-xl-4 mb-3">
                          <div className="card border-success bg-light">
                            <div className="card-header">
                              {proj.catchPhrase}
                            </div>
                            <img className="card-img-top" src={proj.imageLink} alt={proj.imageAlt}/>
                            <div className="card-body">
                              <h5 className="card-title">{proj.title}</h5>
                              <p className="card-text">{proj.description}</p>
                              {proj.internalLinkText ? <Link to={proj.internalLink} className="btn btn-outline-primary">{proj.internalLinkText}</Link> : null}
                              {proj.externalLinkText ? <a href={proj.externalLink} target="_blank" rel="noreferrer" className="btn btn-outline-success mr-3">{proj.externalLinkText}</a> : null}

                            </div>
                          </div>
                        </div>
                      )
                    }
                    )}
                  </div>
                </div>
              </div>
            </div>

          </FadeIn>
        </div>
      </div>
    );
  }
}
export default ProjectsPage;