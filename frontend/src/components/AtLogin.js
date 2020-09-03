import React, { Component } from 'react'
import axios from 'axios'
import {Redirect} from 'react-router-dom'


class AtLogin extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
             response:'',
             redirect:'',
        }
        this.handleLogIn=this.handleLogIn.bind(this)
        
    }
    
    componentDidMount(){
        
        
        
        if(this.state.response===''){
            const parameters=new URLSearchParams(window.location.search).get('code')
            axios({url:'http://127.0.0.1:8000/users/onlogin/',
            method:'post',
            withCredentials:true,
            headers: {'Content-Type' : 'application/json'},
            data:{
                code:parameters,
             }
            })
            .then((res)=>{
                
                if(res.data.status==="user exists"||res.data.status==="user created"){
                    
                    
                    this.setState({
                        redirect:'/home',
                        response:'img'
                    })
                    
                }
                else if(res.data.status==="not in IMG"){
                    this.setState({
                        redirect:'/',
                        response:'non-img'
                    })
                }
                
            })
        

        
        }
    }
    handleLogIn(){
        window.location="http://127.0.0.1:8000/users/afterlogin"
    }
    render() {
        if(this.state.response==='img'){
           
            window.location="http://127.0.0.1:8000/users/afterlogin"
            return (<Redirect exact to={this.state.redirect} />)
            
        }
        
        else if(this.state.response==='non-img'){
            alert('Sorry About being Non-Imgian')
            return (<Redirect exact to={this.state.redirect} />)
        }
       else{
           return <div>Loading ......</div>
       }
       
    }
}

export default AtLogin
