import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSync } from '@fortawesome/free-solid-svg-icons'
import { VictoryContainer, VictoryChart, VictoryAxis, VictoryBar } from 'victory';

const celsiusToFahr = (celsius) => {
  return (9 * celsius / 5 + 32)
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
      data: [],
      currTime: new Date(),
      viewLastXHours: 72,
      lastXHoursChartData: []
      // lastXHoursChartDataMin: 70
    }

    this.refreshTemperature = this.refreshTemperature.bind(this)
    this.handleTempRefresh = this.handleTempRefresh.bind(this)
    this.handleUnitsChange = this.handleUnitsChange.bind(this)
    this.getTemperatureData = this.getTemperatureData.bind(this)
    this.updateLastXHoursChartData = this.updateLastXHoursChartData.bind(this)
  }

  getTemperatureData = async function () {
    const response = await fetch('/api/getdata/all_temperature_data')
    let rawData = await (response.json())
    rawData.sort(o => o.time)
    rawData.forEach(k => k.fahr = celsiusToFahr(k.celsius))
    // rawData = rawData.map(k => { return { x: -(this.state.currTime.getTime() - k.time) / 3.6e+6 } })
    // rawData = rawData.map(k => { return { x:  new Date(k.time)}  })
    this.setState({ data: rawData })
    // console.log(rawData)
  }

  refreshTemperature = async function () {
    this.setState({ loadingCurrTemp: true })
    const response = await fetch('/api/getdata/current_temperature')
    const currState = await (response.json())
    this.setState({
      currCelsius: currState.celsius.toFixed(1),
      currFahr: parseInt(celsiusToFahr(currState.celsius)),
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
      return { useCelsius: !state.useCelsius }
    })
    this.updateLastXHoursChartData()
  }

  updateLastXHoursChartData = function () {
    let newData = this.state.data
      .filter(k => k.time > this.state.currTime.getTime() - 1000 * 60 * 60 * this.state.viewLastXHours)
    const minC = Math.min(...newData.map(obj => obj.celsius))
    const minF = Math.min(...newData.map(obj => obj.fahr))
    this.setState((state, props) => {
      return {
        lastXHoursChartData: newData.map(k => {
          return {
            x: new Date(k.time),
            y: state.useCelsius ? k.celsius : k.fahr,
            y0: state.useCelsius ? minC - 0.5 : minF - 0.9
          }
        })
      }
    })
  }
  componentDidMount() {
    document.title = 'Weather'
    this.refreshTemperature()
    this.getTemperatureData().then((success, failure) => {
      this.updateLastXHoursChartData()
    })

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
              <p>Temperature in the last 72 hours:</p>
              <div>
                <VictoryChart
                  domainPadding={10}
                  containerComponent=
                  {<VictoryContainer
                    style={{
                      touchAction: "auto"
                    }}
                  />
                  }
                >
                  <VictoryAxis
                    label="Time"
                    scale={{ x: "time", y: "linear" }}
                  />
                  <VictoryAxis dependentAxis
                    label={"Temp (" + (this.state.useCelsius ? "°C)" : "°F)")}
                    scale={{ x: "time", y: "linear" }}
                  />
                  <VictoryBar
                    style={{ data: { fill: "#c43a31" } }}
                    data={this.state.lastXHoursChartData}
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
export default WeatherMonitorPage;