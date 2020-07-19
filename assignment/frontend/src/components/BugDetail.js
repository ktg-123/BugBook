import React, { Component } from 'react'
import axios from 'axios'
import { Header, Segment } from 'semantic-ui-react'
import Nav from './Nav'
import BugForm from './BugForm'
import ReactHTMLParser from 'react-html-parser'
import BugUpdate from './BugUpdate'
import CommentList from './CommentList'

class BugDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             bugdetail:'',
             app:'',
             team_members:this.props.location.state.team_members,
             info:this.props.location.state.info,
             creator:this.props.location.state.creator,
       
        }
       
        
    }
    componentDidMount(){
        axios({
            url:`http://127.0.0.1:8000/bugs/${this.props.match.params.id}`,
            method:'get',
            withCredentials:true,
        })
        .then(response=>{
            
            this.setState({
                bugdetail:response.data,
                app:response.data.app_name,
            })
            
        }
        ).catch(error=>console.log(error))
       
    }
    
    render() {
       
        const obj={
            id:this.state.info.id,
            username:this.state.info.username
        }
        
        var checkteam=this.state.team_members.some(elem =>{
            return JSON.stringify(obj) === JSON.stringify(elem);
          });
          const val=(this.state.info.username===this.state.creator||checkteam||this.state.info.is_superuser)
        const bugstyle={
            margin:'1rem',
            
        }
        const updateforn={
            margin:'1rem',
            border:'1px solid black',
            padding:'1rem',

        }

       
        const type=(this.state.bugdetail.bugtype==='d')? 'Defect' :'Enhancement'
        let status
                        if(this.state.bugdetail.status=='ns'){
                            status='Not Seen'
                        }
                        else if(this.state.bugdetail.status=='w'){
                            status = 'Working'
                        }
                        else{
                            status='Resolved'
                        }
        const allteam=this.state.team_members
        
        const updateform=val?<div style={updateforn}>
        {this.state.bugdetail.id?<BugUpdate id={this.state.bugdetail.id} team={allteam}/>:''}
        
        </div>:''
        
        return (
            <div>
            <div>
                <Nav />
            </div>
            <div style={bugstyle}>
                <Header as='h1' color='red'>{this.state.bugdetail.summary}</Header>
                <Header sub>Reported by : {this.state.bugdetail.creator} </Header><br />
                <Segment raised  color='orange'>
                    <Header sub>Description</Header>
                    {ReactHTMLParser(this.state.bugdetail.description)}
                </Segment>
                <br />
                <Header sub color='violet'>Current Status : {status} </Header>
                <Header sub color='red'>Bug Type  : {type   } </Header><br />
            </div>
            {updateform}
            <div className="comments">
               
               {this.state.bugdetail.id?<CommentList id={this.state.bugdetail.id} />:''}
            </div>
            </div>
        )
    }
}

export default BugDetail
