import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import axios from 'axios'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'
class BugForm extends Component {
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
             appdetail:[],
            data:{
                app_name:'',
                bug_type:'',
                summary:'',
                description:'',
             }
        }
    }
    
    componentDidMount(){
        console.log(this.props.bugId)
        axios({
            url:`http://127.0.0.1:8000/apps/${this.props.appId}`,
           method:'get',
           withCredentials:true,
        })
        .then(response=>{
                //console.log(response)
                
                this.setState({
                    appdetail:response.data
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
    handleSubmit=(event, requestType, bugId)=>{
        event.preventDefault()
        console.log(this.state.data)
        switch(requestType){
            case 'post':
                    axios({
                        method:'post',
                        url:'http://127.0.0.1:8000/bugs/',
                        withCredentials:true,
                        data:{
                            app_name:{
                                id:this.state.appdetail.app_name,
                                app_name:this.state.appdetail.id
                            },
                            bugtype:this.state.data.bug_type,
                            summary:this.state.data.summary,
                        },
                    }).then(response=>console.log(response))
                    .catch(err=>console.log(err))
                    break
            case 'put':
                axios({
                    method:'put',
                    url:`http://127.0.0.1:8000/bugs/${bugId}/`,
                    withCredentials:true,
                    data:{
                        app_name:this.state.data.app_name,
                        bug_type:this.state.data.bug_type,
                        summary:this.state.data.summary,
                    }
                }).then(response=>console.log(response))
                .catch(err=>console.log(err))
        }
    }
    render() {
        const type=[
            {
                value:'e',
                text:'Enhancement'
            },
            {
                value:'d',
                text:'Defect'
            }
        ]
        return (
            <div>
                <Form onSubmit={(event)=>this.handleSubmit(
                    event,
                    this.props.requestType,
                    this.props.bugId
                )}>
                
                    {/* <Form.Field required 
                    placeholder="Enter App Name" 
                    control='input'
                    label='App Name'
                    name='app_name'
                    value={this.state.data.app_name} 
                    onChange={event=>{this.handleChange(event)}}
                    /> */}
                    <Form.Field
                    control='input'
                    label='App Name'
                    name='app_name'
                    value={this.state.appdetail.app_name} 
                    onChange={event=>{this.handleChange(event)}}
                    readOnly
                    />
                    <Form.Field required 
                    placeholder="Please enter Bug Summary within 5 words" 
                    control='input'
                    label='Summary'
                    name='summary'
                    value={this.state.data.summary} 
                    onChange={event=>{this.handleChange(event)}}
                    />
                    <Form.Dropdown required
                    placeholder='Select bug Type'
                    selection
                    label="Bug Type"
                    value={this.state.data.bug_type}
                    options={type}
                    onChange={(event, { value }) => {
                            this.setState({
                                data:{
                                    ...this.state.data,
                                    bug_type:value
                                }
                             
                            })
                        }}
                    />
                    <Form.Field label="Description" required></Form.Field>
                    <CKEditor
                    editor={ClassicEditor}
                    
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        console.log( this.state );
                        this.setState({
                                data:{
                                    ...this.state.data,
                                    description:data
                                }
                             
                            })

                    } } 
                    />   
                    <br />
                    {/* <Form.Dropdown
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
                    /> */}
                    <Form.Field control='button' type="submit">
                        {this.props.btnText}
                    </Form.Field> 
                </Form>
            </div>
        )
    }
}

export default BugForm
