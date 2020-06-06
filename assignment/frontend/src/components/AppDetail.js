import React, { Component } from 'react'
import axios from 'axios'
import Nav from './Nav'
import {Link} from 'react-router-dom'
import { Header,Container, Message, Table, Segment, Button } from 'semantic-ui-react'
import '../styles/appdetail.css'
import AppForm from './AppForm'
import ReactHtmlParser from 'react-html-parser';
class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             appdetail:'',
             team_members:[],
             bugs:[],
             info:'',
        }
        
    }
    componentDidMount(){axios({
        url:'http://127.0.0.1:8000/users/reqlogin/',
        method:'get',
        withCredentials:true,
    }).then(response=>{
        
        this.setState({
                        info:response.data
                    })
    })

       axios({
           url:`http://127.0.0.1:8000/apps/${this.props.match.params.id}`,
           method:'get',
           withCredentials:true,
       })
       .then(response=>{
        

           this.setState({
               appdetail:response.data,
               team_members:response.data.team_members,
               
           })
       }).catch(error=>{
           console.log(error)
       })
       axios({
        url:`http://127.0.0.1:8000/bugs/`,
        method:'get',
        withCredentials:true,
    })
    .then(response=>{
        

        this.setState({

            bugs:response.data
        })
    }).catch(error=>{
        console.log(error)
    })

    


    }
    
    render() {
        
        const obj={
            id:this.state.info.id,
            username:this.state.info.username
        }
        var checkteam=this.state.team_members.some(elem =>{
            return JSON.stringify(obj) === JSON.stringify(elem);
          });
        console.log(obj)
        console.log(this.state.team_members)
        const val=(this.state.info.username===this.state.appdetail.creator||checkteam)
        const element=val?<div className="update-form" >
                        <Header as='h3'>Update App Details</Header>
                        <AppForm btnText="Update" requestType="put" appId={this.state.appdetail.id} />
                        </div>
                        :<div></div>
        const names=this.state.names
        return (
            <div>
           <div>
           <Nav />
           </div>
           <div className="appdetail">
            <Header size='huge' color='red'>{this.state.appdetail.app_name} </Header>
            <Header sub>Creator : {this.state.appdetail.creator} </Header><br />
            <Message>
            <Message.Header>About this project</Message.Header>
            <p>{ReactHtmlParser(this.state.appdetail.wiki)}</p>
            
            </Message>
            <div className="team">
            <Segment raised  color='orange'>
            <Header sub>Team Members</Header>
            <ul>
            
            {this.state.team_members.map(team_member=><li key={team_member.id}>{team_member.username}</li>)}
            
            </ul>
            </Segment>
            </div>
            <div className="bugs">
            <Header as='h2' >Bugs</Header>
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
                        let type=(bug.bugtype==='d')? 'Defect' :'Enhancement'
                        {/* let error=(type==='Defect')? 'red' :'' */}
                        return(<Table.Row key={bug.id} >
                        <Table.Cell><Link to={`/home/${this.state.appdetail.id}/${bug.id}`}>{bug.id}</Link></Table.Cell>
                        <Table.Cell>{type}</Table.Cell>
                        <Table.Cell>{bug.summary}</Table.Cell>
                        <Table.Cell>{bug.creator}</Table.Cell>
                        <Table.Cell>{bug.status}</Table.Cell></Table.Row>)
                            
                    })}
                       
                    
                </Table.Body>
                </Table>
                <br />
                <Link to={`/reportbug/${this.state.appdetail.id}`}>
                <Button color='red'>Report Bug</Button>
                </Link>
                <br />
                    
            </div>
            {element}
           </div>
           </div>
        )
    }
}

export default Home
