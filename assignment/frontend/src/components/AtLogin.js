import React, { Component } from 'react'
import axios from 'axios'
import queryString from 'query-string'
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
        
        //const parameters=queryString.parse(this.props.location.search)
        
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
                    //console.log('Hacked')
                    
                    this.setState({
                        redirect:'/home',
                        response:'img'
                    })
                    //console.log(this.state.response)
                }
                else if(res.data.status==="not in IMG"){
                    this.setState({
                        redirect:'/',
                        response:'non-img'
                    })
                }
                //console.log(res.headers)
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
            //return <div>HI</div>
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
