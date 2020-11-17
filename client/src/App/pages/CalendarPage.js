import React, { Component } from 'react';

class CalendarPage extends Component {
  constructor(props) {
    const todayDate = (new Date()).toISOString().substr(0, 10)
    super(props)
    this.state = {
      calendarType: 'MonthlyLandscape.docx',
      date: todayDate,
      weekdayStart: 6,
      calendarCount: 1,
      loading: false,
      calendarLinkExists: false,
      calendarLink: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = async function (event) {
    event.preventDefault()
    this.setState({ calendarLinkExists: false })
    this.setState({ loading: true })
    let jsonObj = {
      template: this.state.calendarType,
      year: Number(this.state.date.slice(0, 4)),
      month: Number(this.state.date.slice(5, 7)),
      day: Number(this.state.date.slice(8, 10)),
      cnt: Number(this.state.calendarCount),
      start_day: Number(this.state.weekdayStart)
    }
    console.log(jsonObj)
    console.log(this.state.date.slice(5, 7))
    // jsonObj = { template:"MonthlyLandscape.docx", year:2020,month:10,day:1,cnt:1,start_day:0}
    console.log(jsonObj)
    const response = await fetch('https://seikurou.pythonanywhere.com/make_calendar/', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonObj)
    })
    const link = (await response.json()).link
    this.setState((state) => {
      return { calendarLink: 'https://seikurou.pythonanywhere.com/file/' + link }
    })
    this.setState({ calendarLinkExists: true })
    this.setState({ loading: false })
  }
  componentDidMount() {
    document.title = 'Make Calendars!'
  }
  render() {
    return (
      <div className="App">
        <div className="fluid-container" style={{ overflowX: "hidden" }}>
          <div className="row justify-content-center my-3">
            <div className="col-10 col-md-8 col-lg-6">
              <div className="card">
                <h1 className="card-header display-4 text-center">Calendar Maker</h1>
                <div className="card-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="calendarType" className="form-label">Calendar Type</label>
                      <select className="form-control" id="calendarType" name='calendarType' onChange={this.handleChange}>
                        <option value='MonthlyLandscape.docx'>Monthly Landscape</option>
                        <option value='WeeklyPortrait.docx'>Weekly Portrait</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date-input" className="form-label">Start Date</label>
                      <input className="form-control" type="date" value={this.state.date} id="date-input" name='date' onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="weekdayStart" className="form-label">Weekday Start</label>
                      <select className="form-control" id="weekdayStart" name='weekdayStart' onChange={this.handleChange}>
                        <option value={6}>Sunday</option>
                        <option value={0}>Monday</option>
                        <option value={1}>Tuesday</option>
                        <option value={2}>Wednesday</option>
                        <option value={3}>Thursday</option>
                        <option value={4}>Friday</option>
                        <option value={5}>Saturday</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="calendar-count" className="form-label">Count (up to 52)</label>
                      <input className="form-control" type="number" value={this.state.calendarCount} id="calendar-count" min='1' max='52' name='calendarCount' onChange={this.handleChange} />
                    </div>
                    <button className="btn btn-success">
                      {this.state.loading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        :
                        "Create"}
                    </button>
                    {this.state.calendarLinkExists ? <a href={this.state.calendarLink}> <button  type="button" className="btn btn-primary ml-3">Download</button></a> : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CalendarPage;