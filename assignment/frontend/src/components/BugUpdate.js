import React, { Component } from 'react'
import axios from 'axios'
import {Form} from 'semantic-ui-react'


 class BugUpdate extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
             bugInfo:'' ,
             status:'',
             assign_to:'',
         }
         this.handleStatus=this.handleStatus.bind(this)
     }
     componentDidMount(){
         axios({
             url:`http://127.0.0.1:8000/bugs/${this.props.id}/`,
             method:'get',
             withCredentials:true
         }).then(response=>{
            
             this.setState({
                 bugInfo:response.data,
                 status:response.data.status,
                 assign_to:response.data.assigned_to
             })
         })
          console.log(this.props)
     }
    handleStatus(event, id){
        axios({
            url:`http://127.0.0.1:8000/bugs/${id}/`,
            method:'patch',
            withCredentials:true,
            data:{
                status:this.state.status,
                assigned_to:this.state.assign_to
            }
        }).then(res=>{
            window.location.reload()
        })
    }
    render() {
        let team_members=[...new Set(this.props.team)]
        console.log(team_members)
        const team=team_members.map(member=>({
            value:member.id,
            text:member.username
        }))
        const status=[
            {
                value:'ns',
                text:'Not Seen'
            },
            {
                value:'w',
                text:'Working'
            },
            {
                value:'r',
                text:'Resolved'
            }
        ]

        return (
            <div>
                <Form onSubmit={(event)=>this.handleStatus(
                    event,
                    this.props.id
                )}>
            <Form.Dropdown required
                    placeholder='Select Status Type'
                    selection
                    label="Status"
                    value={this.state.status}
                    options={status}
                    onChange={(event, { value }) => {
                            this.setState({
                                status:value
                             
                            })
                        }}
            />
            <Form.Dropdown required
                    placeholder='Select a member'
                    selection
                    label="Assign to:"
                    value={this.state.assign_to}
                    options={team}
                    onChange={(event, { value }) => {
                            this.setState({
                                assign_to:value
                             
                            })
                        }}
            />
            <Form.Field control='button' type="submit">
                        Update
                    </Form.Field> 
            </Form>
            </div>
        )
    }
}

export default BugUpdate
