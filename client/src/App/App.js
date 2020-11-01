import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import SiteNavbar from './pages/SiteNavbar';
import HomePage from './pages/HomePage';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <SiteNavbar />
        <Switch>
          <Route exact path='/aboutself' component={AboutPage}/>
          <Route exact path='/' component ={HomePage}></Route>
          <Route exact path='/projects' component={ProjectsPage}/>
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