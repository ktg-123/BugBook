import React, { Component } from 'react'
import EditForm from './EditForm'
import axios from 'axios'
import {Segment} from 'semantic-ui-react'
import Nav from './Nav'


class AdminEdit extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             id:this.props.match.params.id,
             info:''
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
    }
    render() {
        const element =this.state.info.is_superuser?<EditForm id={this.state.id}/>:<Segment inverted color='red' secondary>You must be Admin to get this page</Segment>
        return (
            <div>
                <div>
                <Nav />
            </div> 
            <div>
                {element}
            </div>
            </div>
        )
    }
}

export default AdminEdit
