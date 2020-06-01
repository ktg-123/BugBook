import React, { Component } from 'react'
import axios from 'axios'
import Nav from './Nav'
import AppForm from './AppForm'
class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             members:[],

        }
    }
    
    render() {
        return (
            <div>
                <div>
                    <Nav />
                    <AppForm requestType="post" appId={null} btnText="Register" />
                </div>
            </div>
        )
    }
}

export default Register
