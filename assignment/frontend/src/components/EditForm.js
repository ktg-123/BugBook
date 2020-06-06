import React, { Component } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { Form, Checkbox } from 'semantic-ui-react'
class EditForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             data:{
                 username:'',
                 first_name:'',
                 last_name:'',
                 email:'',
                 is_superuser:'',
                 is_active:'',
             }
        }
        this.handleSubmit=this.handleSubmit.bind(this)
        
    }
    
    componentDidMount(){
        axios({
            url:`http://127.0.0.1:8000/users/${this.props.id}`,
            method:'get',
            withCredentials:true,
        }).then(response=>{
            console.log(response)
            const res=response.data
            this.setState({
                data:{
                    username:res.username,
                    first_name:res.first_name,
                    last_name:res.last_name,
                    email:res.email,
                    is_superuser:res.is_superuser,
                    is_active:res.is_active
                }
                
            })
        })
    }
   
    handleSubmit(event,){
        event.preventDefault()
        console.log(this.state.data)
        axios({
            url:`http://127.0.0.1:8000/users/${this.props.id}/`,
            method:'put',
            withCredentials:true,
            data:{
                "username": this.state.data.username,
                "is_staff": this.state.data.is_staff,
                "is_active": this.state.data.is_active,
                "is_superuser": this.state.data.is_superuser,
                "email": this.state.data.email,
                "first_name": this.state.data.first_name,
                "last_name": this.state.data.last_name
            }
        }).then(response=>console.log(response))
        .catch(error=>console.log(error))

    }
    render() {
        return (
            <div>
               
                <div>
                    <Form onSubmit={(event)=>this.handleSubmit(
                        event
                    )}>
                    <Form.Field
                    control='input'
                    label='Username'
                    name='username'
                    value={this.state.data.username} 
                    onChange={event=>{this.handleChange(event)}}
                    readOnly
                    />
                    <Form.Field
                    control='input'
                    label='First Name'
                    name='first_name'
                    value={this.state.data.first_name} 
                    onChange={event=>{this.handleChange(event)}}
                    readOnly
                    />
                    <Form.Field
                    control='input'
                    label='Last Name'
                    name='last_name'
                    value={this.state.data.last_name} 
                    onChange={event=>{this.handleChange(event)}}
                    readOnly
                    />
                    <Form.Field
                    control='input'
                    label='Email'
                    name='email'
                    value={this.state.data.email} 
                    onChange={event=>{this.handleChange(event)}}
                    readOnly
                    />
                    <Checkbox
//                    control='checkbox'
                    label='Admin'
                    name='is_superuser'
                    checked={this.state.data.is_superuser} 
                    onChange={(event, {checked})=>
                    {
                        this.setState({
                            data:{
                                ...this.state.data,
                                is_superuser:checked
                            }
                        })
                        }}
                    
                    /><br />
                    <Checkbox
//                    control='checkbox'
                    label='Active'
                    name='is_active'
                    checked={this.state.data.is_active} 
                    onChange={(event, {checked})=>
                    {
                        this.setState({
                            data:{
                                ...this.state.data,
                                is_active:checked
                            }
                        })
                        }}
                    
                    />
                    <Form.Field control='button' type="submit">
                        Update
                    </Form.Field> 
                    </Form>
                </div>
            </div>
        )
    }
}

export default EditForm
