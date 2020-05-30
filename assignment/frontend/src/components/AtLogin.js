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
    
    render() {
        if(this.state.response==='img'){
            return (<Redirect to={this.state.redirect} />)
        }
        
        else if(this.state.response==='non-img'){
            alert('Sorry About being Non-Imgian')
            return (<Redirect to={this.state.redirect} />)
        }
       else{
           return <div>{this.state.response}</div>
       }
        // return(

        //     <div>
        //             return (<Redirect to='/home' />)    
        //     </div>
        // )
    }
}

export default AtLogin
