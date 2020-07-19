import React, { Component } from 'react'
import { Button, Header } from 'semantic-ui-react'
import '../styles/login.css'

class Login extends Component {
    
    redirect(){
        window.location="https://internet.channeli.in/oauth/authorise/?client_id=fgBgJtpe1JtrRU36zyzstoBedUog7ae62BCjieZS&redirect_url=http://127.0.0.1:3000/atlogin&state=5ca75bd30"
    }
    constructor(props) {
        super(props)
    
        this.state = {

        }
        this.redirect=this.redirect.bind(this)
    }
    
    
    render() {
        
        return (
            <div className='page'>
            <div className='heading'>
            <Header as="h1">Welcome to</Header>
            <Header as='h2'>BugBook</Header>
            </div>

                <Button onClick={this.redirect}> 
                    Login with channeli
                </Button> 
            </div>          
        )
    }
}

export default Login
