import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import AboutPage from './pages/AboutPage';
import List from './pages/List';
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
          <Route path='/list' component={List}/>
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