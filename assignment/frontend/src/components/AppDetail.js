import React, { Component } from 'react'
import axios from 'axios'
import Nav from './Nav'
import {Link} from 'react-router-dom'
import { Header,Container, Message, Table, Segment } from 'semantic-ui-react'
import '../styles/appdetail.css'
class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             appdetail:'',
             team_members:[],
             bugs:[]
        }
        
    }
    componentDidMount(){
       axios({
           url:`http://localhost:8000/apps/${this.props.match.params.id}`,
           method:'get',
           withCredentials:true,
       })
       .then(response=>{
           console.log(response.data.team_members)

           this.setState({
               appdetail:response.data,
               team_members:response.data.team_members,
               
           })
       }).catch(error=>{
           console.err(error)
       })
       axios({
        url:`http://localhost:8000/bugs/`,
        method:'get',
        withCredentials:true,
    })
    .then(response=>{
        console.log(response.data)

        this.setState({

            bugs:response.data
        })
    }).catch(error=>{
        console.err(error)
    })


    }
    render() {
        console.log(this.state.appdetail.app_name)
        return (
            <div>
           <div>
           <Nav />
           </div>
           <div className="appdetail">
            <Header as='h1' color='red'>{this.state.appdetail.app_name} </Header>
            <Header sub>Creator : {this.state.appdetail.creator} </Header><br />
            <Message>
            <Message.Header>About this project</Message.Header>
            <p>{this.state.appdetail.wiki}</p>
            </Message>
            <div className="team">
            <Segment raised  color='orange'>
            <Header sub>Team Members</Header>
            <ul>
            {this.state.team_members.map((team_member)=>
            <li key={team_member.id}>{team_member.username}</li>
            )}
            </ul>
            </Segment>
            </div>
            <div className="bugs">
                <Table celled fixed singleLine>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>ID</Table.HeaderCell>
                    <Table.HeaderCell>Type</Table.HeaderCell>
                    <Table.HeaderCell>Summary</Table.HeaderCell>
                    <Table.HeaderCell>Reported BY</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.bugs.filter(bug=>(bug.app_name['app_name'])===(this.state.appdetail.app_name)).map(bug=>{
                        return(<Table.Row key={bug.id}>
                        <Table.Cell>{bug.id}</Table.Cell>
                        <Table.Cell>{bug.bugtype}</Table.Cell>
                        <Table.Cell>{bug.summary}</Table.Cell>
                        <Table.Cell>{bug.creator}</Table.Cell>
                        <Table.Cell>{bug.status}</Table.Cell></Table.Row>)
                            
                    })}
                       
                    
                </Table.Body>
                </Table>
            </div>
           </div>
           </div>
        )
    }
}

export default Home
