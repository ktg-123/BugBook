import React, { Component } from 'react'
import axios from 'axios'
import { Card, Segment, Grid } from 'semantic-ui-react'
import {Link} from 'react-router-dom'


class AdminView extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             users:[],
        }
    }
    componentDidMount(){
        axios({
            url:'http://127.0.0.1:8000/users/',
            method:'get',
            withCredentials:true,
        }).then(response=>{
            this.setState({
                users:response.data
            }) 
            
        })
    }
    render() {
        const bodyStyle={
            margin:'1rem',
            padding:'1rem'


        }
        return (
            <div>
               
            <div style={bodyStyle}>
                <Grid columns={3} divided>
                    {this.state.users.map(user=>{
                        return(
                            <Grid.Column>
                            <Card>
                                <Card.Content>
                                    <Link to={`/adminview/${user.id}`}><Card.Header>{user.first_name} {user.last_name}</Card.Header></Link>
                                    <Card.Description>
                                    <Segment.Group>
                                            <Segment><strong>Username</strong> : {user.username}</Segment>
                                            <Segment><strong>Email</strong> : {user.email}</Segment>
                                            <Segment><strong>Admin Status </strong>: {user.is_superuser?"Yes":"No"}</Segment>
                                            <Segment><strong>Active Status</strong> : {user.is_active?"Yes":"No"} </Segment>
                                        </Segment.Group>                                        
                                    </Card.Description>
                                </Card.Content>
                            </Card>
                            </Grid.Column>
                        )
                    })}
                </Grid>
            </div>
            </div>
        )
    }
}

export default AdminView
