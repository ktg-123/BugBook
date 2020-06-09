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
             //id:this.props.location.state.creator_id,
        }
        //console.log(this.props.match)
        
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
            //console.log(this.state.app.id)
        }
        ).catch(error=>console.log(error))
        // console.log(this.props.location.state)
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
        // const creator_user={
        //     id:this.state.id,
        //     username:this.state.creator
        // }
        // allteam.push(creator_user)
        const updateform=val?<div style={updateforn}>
        {this.state.bugdetail.id?<BugUpdate id={this.state.bugdetail.id} team={allteam}/>:''}
        
        </div>:''
        //console.log(allteam)
        //console.log(allteam)
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
               {/* {this.state.bugdetail.id?<Comments id={this.state.bugdetail.id} />:''} */}
               {this.state.bugdetail.id?<CommentList id={this.state.bugdetail.id} />:''}
            </div>
            </div>
        )
    }
}

export default BugDetail
