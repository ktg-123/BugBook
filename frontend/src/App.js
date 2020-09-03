import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import AtLogin from './components/AtLogin';
import Dashboard from './components/Dashboard';
import AppDetail from './components/AppDetail'
import BugDetail from './components/BugDetail';
import Register from './components/Register';
import ReportBug from './components/ReportBug'
import AdminView from './components/AdminView';
import EditForm from './components/EditForm'
import axios from 'axios';
import Admin from './components/Admin'
import AdminEdit from './components/AdminEdit';
const Auth1={
  isAuthenticated:true,
  authenticate(cb){
    this.isAuthenticated=true
    setTimeout(cb, 100)
  },
  signout(cb){
    this.isAuthenticated=false
    setTimeout(cb, 100)
  },
}


var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      Auth1.isAuthenticated=true
    }
    else{
      Auth1.isAuthenticated=false
    }
  };
  xhttp.open("GET", "http://127.0.0.1:8000/", false);
  xhttp.withCredentials=true
  xhttp.send();


const PublicRoute=({component:Component, ...rest})=>(
  <Route {...rest} render={(props)=>(
    Auth1.isAuthenticated===false?<Component {...props} />:<Redirect to='/home' />
  )}/>
)



const PrivateRoute=({component:Component, ...rest})=>(
  <Route {...rest} render={(props)=>(
    Auth1.isAuthenticated===true?<Component {...props} />:<Redirect to='/' />
  )}/>
)




class App extends React.Component {

  // componentDidMount(){
  //   axios({
  //     url:`http://127.0.0.1:8000/`,
  //       method:'get',
  //       withCredentials:true,
  //   }).then(response=>{
  //     console.log(response)
  //     if(response.status===200){
  //       fakeAuth.isAuthenticated=true
  //     }
  //     else{
  //       fakeAuth.isAuthenticated=false
  //     }
  //   })
  // }
  
  render(){
  return (
    <Router>
      <Switch>
      
        <PublicRoute path='/' exact component={Login} />
        <Route path='/atlogin' exact component={AtLogin} />
        <PrivateRoute path='/dashboard' exact component={Dashboard} />
        <PrivateRoute path='/home' exact component={Home} />
        <PrivateRoute path='/home/:id' exact component={AppDetail} />
        <PrivateRoute path='/home/:id/:id' exact component={BugDetail} />
        <PrivateRoute path='/register' exact component={Register} />
        <PrivateRoute path='/reportbug/:id' exact component={ReportBug} />
        <PrivateRoute path='/adminview' exact component={Admin} />
        <PrivateRoute path='/adminview/:id' exact component={AdminEdit} />
      </Switch>
    </Router>
  );
}}

export default App;
