import React, { Component } from 'react'
import axios from 'axios'
import { Header, Segment } from 'semantic-ui-react'
import Nav from './Nav'

class BugDetail extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             bugdetail:'',
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
            console.log(response.data)
            this.setState({
                bugdetail:response.data
            })
        }
        )
    }
    render() {
        const bugstyle={
            margin:'1rem',
            
        }
        const type=(this.state.bugdetail.bugtype==='d')? 'Defect' :'Enhancement'
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
                    {this.state.bugdetail.description}
                </Segment>
                <br />
                <Header sub color='violet'>Current Status : {this.state.bugdetail.status} </Header>
                <Header sub color='red'>Bug Type  : {type   } </Header><br />
            </div>
            </div>
        )
    }
}

export default BugDetail
