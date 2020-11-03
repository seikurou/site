import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SiteNavbar from './pages/SiteNavbar';
import HomePage from './pages/HomePage';
import UrlShortenerPage from './pages/UrlShortenerPage';
import GarageControlPage from './pages/GarageControlPage'
import WeatherMonitorPage from './pages/WeatherMonitorPage';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <SiteNavbar />
        <Switch>
          <Route exact path='/aboutself' component={AboutPage}/>
          <Route exact path='/' component ={HomePage}></Route>
          <Route exact path='/projects' component={ProjectsPage}/>
          <Route exact path='/shortener' component={UrlShortenerPage}/>
          <Route exact path='/garagecontrol' component={GarageControlPage}/>
          <Route exact path ='/weathermonitor' component={WeatherMonitorPage}/>
        </Switch>
      </div>
    )
    return (
      <Switch>
        <App/>
      </Switch>
    );
  }
}

export default App;