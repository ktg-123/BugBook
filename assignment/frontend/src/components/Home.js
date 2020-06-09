import React, { Component } from 'react'
import axios from 'axios'
import '../styles/home.css'
import Nav from './Nav'
import {Link} from 'react-router-dom'
import { Card } from 'semantic-ui-react'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             apps:[]
        }
    }
    componentDidMount(){
        axios({url:'http://127.0.0.1:8000/apps/',
        method:'get',
        withCredentials:true,})
        .then(response=>{
            //console.log(response)
            this.setState({
                apps:response.data
            })

        })

    }
    
    render() {
        const appStyle={
            textDecoration:'none',
            color:'black'
        }
        return (
            <div>
            <Nav />
            <div classNmae="apps">
              {this.state.apps.map((app)=>{
              return(
              <div className="app" key={app.id}>
              <Card>
              <Card.Content>
              <Link style={appStyle} to={`/home/${app.id}`}>{app.app_name}</Link>
              </Card.Content>
              <Card.Content extra>By : {app.creator} </Card.Content>
              </Card>
              </div>
              )
              })}
            </div>
            </div>  
        )
    }
}

export default Home
