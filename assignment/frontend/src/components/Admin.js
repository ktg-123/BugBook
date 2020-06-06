import React, { Component } from 'react'
import AdminView from './AdminView'
import { Segment } from 'semantic-ui-react'
import Nav from './Nav'
import axios from 'axios'
class Admin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
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
        const element =this.state.info.is_superuser?<AdminView />:<Segment inverted color='red' secondary>You must be Admin to get this page</Segment>
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

export default Admin
