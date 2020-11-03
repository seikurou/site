import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'

const celsiusToFahr = (celsius) => {
  return parseInt( 9 * celsius / 5 + 32)
}

class WeatherMonitorPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      useCelsius: false,
      timeOfLastTempMeasure: "",
      currCelsius: "",
      currFahr: "",
      loadingCurrTemp: true,
      loadingData: true,
      data: []
    }

    this.refreshTemperature = this.refreshTemperature.bind(this)
    this.handleTempRefresh = this.handleTempRefresh.bind(this)
    this.handleUnitsChange = this.handleUnitsChange.bind(this)
  }

  refreshTemperature = async function () {
    this.setState({ loadingCurrTemp: true })
    const response = await fetch('/api/getdata/current_temperature')
    const currState = await (response.json())
    console.log(currState)
    this.setState({
      currCelsius: currState.celsius.toFixed(1),
      currFahr: celsiusToFahr(currState.celsius),
      timeOfLastTempMeasure: new Date(currState.time).toLocaleTimeString()
    })
    this.setState({ loadingCurrTemp: false })
  }

  handleTempRefresh = async function (event) {
    event.preventDefault()
    await this.refreshTemperature()
  }

  handleUnitsChange = function (event) {
    event.preventDefault()
    this.setState((state, props) => {
      return {useCelsius: !state.useCelsius}
    })

  }
  componentDidMount() {
    document.title = 'Weather'
    this.refreshTemperature()
  }
  render() {
    return (
      <div className="App">
        <div className="fluid-container" style={{ overflowX: "hidden" }}>
          <div className="row justify-content-center my-3">
            <div className="col-10 col-lg-8">
              <div className="card bg-light">
                <h1 className="card-header display-4 text-center">Weather</h1>
                <div className="card-body text-center">
                <button className="btn btn-warning mb-3 mr-3" onClick={this.handleUnitsChange}>
                °C/°F
                  </button>
                  <button className="btn btn-primary mb-3" onClick={this.handleTempRefresh}>
                    {this.state.loadingCurrTemp ?
                      <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                      : <FontAwesomeIcon icon={faSync} className="mr-2" />}
                    Refresh
                  </button>
                  <div>
                    <h2 className={this.state.loadingCurrTemp ? "text-white" : ""}>It's currently {this.state.useCelsius ? this.state.currCelsius + "°C" : this.state.currFahr + "°F"}</h2>
                    <p className="text-muted">(in my house as of {this.state.timeOfLastTempMeasure}).</p>
                    <p className="text-muted">By the way, today is {(new Date()).toDateString()}.</p>
                    <p className="text-muted">Updated every 15 minutes.</p>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-10 col-lg-8">
              <p>Some data visualization to come</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default WeatherMonitorPage;