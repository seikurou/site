import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

class GarageControlPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGarageState: '',
      timeOfLastCycle: -1,
      isOpen: false,
      loadingGarageState: true,
      loadingData: true,
      data: []
    }

    this.refreshGarageState = this.refreshGarageState.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
  }

  refreshGarageState = async function () {
    this.setState({ loadingGarageState: true })
    const response = await fetch('/api/getdata/is_garage_open')
    const currState = await (response.json())
    console.log(currState)
    this.setState({
      isOpen: currState.open,
      currentGarageState: currState.open ? "open" : "closed",
      timeOfLastCycle: new Date(currState.time).toLocaleTimeString()
    })
    this.setState({ loadingGarageState: false })
  }

  handleRefresh = async function (event) {
    event.preventDefault()
    await this.refreshGarageState()
  }
  componentDidMount() {
    document.title = 'Garage'
    this.refreshGarageState()
  }
  render() {
    return (
      <div className="App">
        <div className="fluid-container" style={{ overflowX: "hidden" }}>
          <div className="row justify-content-center my-3">
            <div className="col-10 col-lg-8">
              <div className="card">
                <h1 className="card-header display-4 text-center">Garage</h1>
                <div className="card-body text-center">
                  <button className="btn btn-primary mb-3" onClick={this.handleRefresh}>
                    {this.state.loadingGarageState ?
                      <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                      : <FontAwesomeIcon icon={faSync} className="mr-2" />}
                    Refresh
                  </button>                
                     <div>
                      <h2 className={this.state.loadingGarageState ? "text-white" : ""}>Garage is {this.state.currentGarageState},</h2>
                      <p className="text-muted">and has been since {this.state.timeOfLastCycle}.</p>
                      <p className="text-muted">By the way, today is {(new Date()).toDateString()}.</p>
                    </div>
                  
                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8">
              <p>hi</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GarageControlPage;