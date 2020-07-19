import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'


class AppForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             members:[],
             detail_members:[],
             data:{
                 app_name:'',
                 team_members:[],
                 wiki:'',
                 
             },
             postData:'',
             info:''
        }
    }
    
    componentDidMount(){
        axios({
            url:`http://127.0.0.1:8000/users/`,
           method:'get',
           withCredentials:true,
        })
        .then(response=>{
                
                this.setState({
                    members:response.data
                })
            }
        ).catch(err=>console.log(err))
        axios({
            url:`http://127.0.0.1:8000/users/reqlogin`,
           method:'get',
           withCredentials:true,
        })
        .then(response=>{
                
                this.setState({
                    info:response.data
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
        
        console.log(this.state.data)
        const team_members=this.state.detail_members.map(str=>JSON.parse(str))
        console.log(team_members)
        switch(requestType){
            case 'post':
                    axios({
                        method:'post',
                        url:'http://127.0.0.1:8000/apps/',
                        withCredentials:true,
                        data:{
                            creator:{
                                id:this.state.info.id,
                                username:this.state.info.username
                            },
                            app_name:this.state.data.app_name,
                            team_members:team_members,
                            wiki:this.state.data.wiki,
                        },
                    }).then(response=>{
                        console.log(response)
                
                    })
                    .catch(err=>console.log(err))
                    break
            case 'put':
                axios({
                    method:'patch',
                    url:`http://127.0.0.1:8000/apps/${appId}/`,
                    withCredentials:true,
                    data:{
                        app_name:this.state.data.app_name,
                        team_members:team_members,
                        wiki:this.state.data.wiki,
                
                    }
                }).then(response=>{
                    console.log(response)
                    window.location.reload()
                })
                .catch(err=>console.log(err))
                
        }
    }
    render() {
        const maintainers=this.state.members.map(user=>({
            
             value:JSON.stringify({id:user.id, username:user.username}),
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
                             
                            })
                        }}
                    />
                    <Form.Field label="Wiki" required></Form.Field>
                    <CKEditor
                    editor={ClassicEditor}
               
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( this.state );
                        this.setState({
                                data:{
                                    ...this.state.data,
                                    wiki:data
                                }
                             
                            })

                    } } 
                    /> 
                    <br />
                    <Form.Field control='button' type="submit">
                        {this.props.btnText}
                    </Form.Field> 
                </Form>
    
  
            </div>
        )
    }
}

export default AppForm
