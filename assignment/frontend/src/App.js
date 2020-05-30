import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom'
import AtLogin from './components/AtLogin';
import Dashboard from './components/Dashboard';
import AppDetail from './components/AppDetail'
function App() {
  return (
    <Router>
      <Switch>
      
        <Route path='/' exact component={Login} />
        <Route path='/atlogin' exact component={AtLogin} />
        <Route path='/dashboard' exact component={Dashboard} />
        <Route path='/home' exact component={Home} />
        <Route path='/home/:id' exact component={AppDetail} />
      </Switch>
    </Router>
  );
}

export default App;
