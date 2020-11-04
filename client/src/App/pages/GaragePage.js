import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { VictoryBar, VictoryChart, VictoryHistogram, VictoryAxis } from 'victory';

class GaragePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentGarageState: '',
      timeOfLastCycle: -1,
      isOpen: false,
      loadingGarageState: true,
      loadingData: true,
      data: [],
      currTime: new Date()
    }

    this.refreshGarageState = this.refreshGarageState.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.getGarageData = this.getGarageData.bind(this)
  }

  getGarageData = async function () {
    const response = await fetch('/api/getdata/all_garage_data')
    let rawData = await (response.json())
    rawData.sort(o => o.time)
    // rawData = rawData.map(k => { return { x: -(this.state.currTime.getTime() - k.time) / 3.6e+6 } })
    rawData = rawData.map(k => { return { x:  new Date(k.time)}  })
    this.setState({ data: rawData })
    console.log(rawData)
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
    this.getGarageData()
  }
  render() {
    return (
      <div className="App">
        <div className="fluid-container" style={{ overflowX: "hidden" }}>
          <div className="row justify-content-center my-3">
            <div className="col-10 col-lg-8">
              <div className="card bg-light">
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
              <p>Activity in the last 12 hours:</p>
              <div>
                <VictoryChart
                  domainPadding={{ x: 20 }}
                >
                  {/* <VictoryAxis
                    label="Hours ago"
                  /> */}
                  <VictoryHistogram
                    style={{
                      data: { fill: "#c43a31" }
                    }}
                    data={this.state.data}

                    // bins={[...Array(48).keys()].map(k => -12 + k / 4)}
                    bins={[...Array(36).keys()].map(k => new Date(this.state.currTime.getTime() - 4.32e+7 + k*3.6e+6/3))}
                  />

                </VictoryChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default GaragePage;