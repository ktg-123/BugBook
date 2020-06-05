import React, { Component } from 'react'
import Nav from './Nav'
import axios from 'axios'
import {Link} from 'react-router-dom'
import { Header, Grid, Segment, } from 'semantic-ui-react'
import '../styles/dashboard.css'
class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             info:'',
             apps:[],
        }
    }
    
    componentDidMount(){
        axios({
            url:'http://127.0.0.1:8000/users/reqlogin/',
            method:'get',
            withCredentials:true,
        }).then(response=>{
            console.log(response)
            this.setState({
                            info:response.data
                        })
        })
        axios({
            url:'http://127.0.0.1:8000/apps/getapps/',
            method:'get',
            withCredentials:true,
        }).then(response=>{
            //console.log(response)
            this.setState({
                apps:response.data
            })
        })
    }

    render() {
        return (
            <div>
            <div>
              <Nav />  
            </div>
            <div className="heading">
            <Grid centered columns={2}>
                <Grid.Column textAlign="center">
                <Header as='h1' color='teal'>Welcome {this.state.info.first_name}</Header>
                </Grid.Column>
            </Grid>
            </div>
            <div className="info">
            <Header as='h2' color='blue'>Personal Information</Header>
            <Segment.Group>
            <Segment><strong>Full Name</strong> : {this.state.info.first_name} {this.state.info.last_name}</Segment>
                <Segment><strong>Username</strong> : {this.state.info.username}</Segment>
                <Segment><strong>Email</strong> : {this.state.info.email}</Segment>
                <Segment><strong>Admin Status </strong>: {this.state.info.is_superuser?"Yes":"No"}</Segment>
                <Segment><strong>Staff Status </strong>: {this.state.info.is_staff?"Yes":"No"}</Segment>
                <Segment><strong>Active Status</strong> : {this.state.info.is_active?"Yes":"No"} </Segment>
            </Segment.Group>
            </div>
            <div className="info">
            <Header as='h2' color='blue'>Your Registered Apps</Header>
            <Segment.Group>
            {this.state.apps.map(app=><Segment key={app.id}><Link to={`/home/${app.id}`}>{app.app_name}</Link></Segment>

            )}
            </Segment.Group>
            </div>
            </div>
        )
    }
}

export default Dashboard
