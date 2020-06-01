import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
class AppForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             members:[],
             detail_members:[],
             data:{
                 app_name:'',
                 team_members:[],
             }
        }
    }
    
    componentDidMount(){
        axios({
            url:`http://127.0.0.1:8000/users/`,
           method:'get',
           withCredentials:true,
        })
        .then(response=>{
                console.log(response)
                this.setState({
                    members:response.data
                })
            }
        ).catch(err=>console.log(err))
    }
    handleChange=(event)=>{
        let name=event.target.name
        this.setState({
            data:{
                ...this.state.data,
                [name]:event.target.value
            }
        })
    }
    handleSubmit=(event, requestType, appId)=>{
        event.preventDefault()
        //console.log(this.state.data)  
        switch(requestType){
            case 'post':
                    axios({
                        method:'post',
                        url:'http://127.0.0.1:8000/apps/',
                        withCredentials:true,
                        data:{
                            app_name:this.state.data.app_name,
                            team_members:this.state.data.team_members,
                        }
                    }).then(response=>console.log(response))
                    .catch(err=>console.log(err))
            case 'put':
                axios({
                    method:'put',
                    url:`http://127.0.0.1:8000/apps/${appId}/`,
                    withCredentials:true,
                    data:{
                        app_name:this.state.data.app_name,
                        team_members:this.state.data.team_members,
                    }
                }).then(response=>console.log(response))
                .catch(err=>console.log(err))
        }
    }
    render() {
        const maintainers=this.state.members.map(user=>({
            value:JSON.stringify({id:user.id, team_members:user.username}),
            text:user.first_name,
        }))
        return (
            <div>
                <Form onSubmit={(event)=>this.handleSubmit(
                    event,
                    this.props.requestType,
                    this.props.appId
                )}>
                    <Form.Field required 
                    placeholder="Enter App Name" 
                    control='input'
                    label='App Name'
                    name='app_name'
                    value={this.state.data.app_name} 
                    onChange={event=>{this.handleChange(event)}}
                    />
                    <Form.Dropdown
                        placeholder="Select the Project Makers"
                        search
                        required
                        multiple
                        selection
                        label="Maintainers:"
                        value={this.state.detail_members}
                        options={maintainers}
                        onChange={(event, { value }) => {
                            this.setState({
                             detail_members:value,
                             data:{
                                 ...this.state.data,
                                 team_members:this.state.detail_members.map((str)=>JSON.parse(str))
                             }   
                            })
                        }}
                    />
                    <Form.Field control='button' type="submit">
                        {this.props.btnText}
                    </Form.Field> 
                </Form>
    
  
            </div>
        )
    }
}

export default AppForm
