import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons'

class UrlShortenerPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      longUrl: '',
      loading: false,
      shortenedUrls: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ longUrl: event.target.value })
  }

  handleSubmit = async function (event) {
    event.preventDefault()
    this.setState({ loading: true })
    const response = await fetch('/api/new_short_url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ longUrl: this.state.longUrl })
    })
    const shortUrl = (await response.json()).shortUrl
    this.setState((state) => {
      return { shortenedUrls: [[state.longUrl, shortUrl]].concat(state.shortenedUrls) }
    })
    this.setState({ longUrl: '' })
    this.setState({ loading: false })
  }
  componentDidMount() {
    document.title = 'Shorten URLs!'
  }
  render() {
    return (
      <div className="App">
        <div className="fluid-container" style={{ overflowX: "hidden" }}>
          <div className="row justify-content-center my-3">
            <div className="col-10 col-md-8 col-lg-6">
              <div className="card">
                <h1 className="card-header display-4 text-center">URL Shortener</h1>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="longUrl" className="sr-only">Enter URL</label>
                      <input required type="url" className="form-control" id="longUrl" value={this.state.longUrl} onChange={this.handleChange} placeholder="Enter URL" />
                    </div>
                    <button className="btn btn-success">
                      {this.state.loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        :
                        "Shorten"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {this.state.shortenedUrls.length ? <div className="row justify-content-center ">
            <div className="col-10 col-md-8 col-lg-6">
              <div className="card" >
                <div className="card-header">
                  Your shortened URLs.
                </div>
                <ul className="list-group list-group-flush">
                  <div className="fluid-container">
                    {this.state.shortenedUrls.map((links, i) => {
                      return (
                      <li key={i} className="list-group-item">
                        <div className="row justify-content-center align-items-center">
                          <div className="col">
                            <a href={links[0]}>{links[0]}</a>
                            <br />
                            <a href={links[1]}><code className="border bg-light rounded text-danger">{"efang.me/" + links[1]}</code></a>
                          </div>
                          <div className="col text-right">
                            <button className="btn btn-primary" onClick={() => {navigator.clipboard && navigator.clipboard.writeText("https://efang.me/" + links[1]) }} ><FontAwesomeIcon icon={faCopy} className="mr-2" />Copy</button>
                          </div>
                        </div>
                      </li>)
                    })}
                  </div>
                </ul>
              </div>
            </div>
          </div>
            : null}
        </div>
      </div>
    );
  }
}
export default UrlShortenerPage;