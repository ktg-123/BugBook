import React, { Component } from 'react'
import axios from 'axios'
class Login extends Component {
    // componentDidMount(){
    //     axios({url:'http://localhost:8000/',
    //            withCredentials:true,
    //            method:'get', 
    //     })
    //     .then(res=>{
    //         console.log(res)
    //     })
        
    // }
    redirect(){
        window.location="https://internet.channeli.in/oauth/authorise/?client_id=fgBgJtpe1JtrRU36zyzstoBedUog7ae62BCjieZS&redirect_url=http://localhost:3000/atlogin/&state=5ca75bd30"
    }
    constructor(props) {
        super(props)
    
        this.state = {

        }
        this.redirect=this.redirect.bind(this)
    }
    
    render() {
        return (
            <div>
                <button onClick={this.redirect}> 
                    Login with channeli
                </button> 
            </div>          
        )
    }
}

export default Login
