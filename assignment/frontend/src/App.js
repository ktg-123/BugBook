import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom'
import AtLogin from './components/AtLogin';
import Dashboard from './components/Dashboard';
import AppDetail from './components/AppDetail'
import BugDetail from './components/BugDetail';
import Register from './components/Register';
import ReportBug from './components/ReportBug'
function App() {
  return (
    <Router>
      <Switch>
      
        <Route path='/' exact component={Login} />
        <Route path='/atlogin' exact component={AtLogin} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/home' exact component={Home} />
        <Route path='/home/:id' exact component={AppDetail} />
        <Route path='/home/:id/:id' exact component={BugDetail} />
        <Route path='/register' exact component={Register} />
        <Route path='/reportbug/:id' exact component={ReportBug} />
      </Switch>
    </Router>
  );
}

export default App;
