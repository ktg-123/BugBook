import React, { Component } from 'react'
import axios from 'axios'
import { Comment, Header } from 'semantic-ui-react'
import ReactHtmlParser from 'react-html-parser';
import '../styles/comment.css'
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class CommentList extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          comments:[],
          chatSocket: new WebSocket('ws://127.0.0.1:8000/ws/chat/' + this.props.id + '/'),   
          user:''

        }
        this.sendMessage=this.sendMessage.bind(this)
        this.keyUp=this.keyUp.bind(this)
    }
    componentWillMount(){
        this.state.chatSocket.onmessage = (e) => {
          
            var data = JSON.parse(e.data);
            var message = data['message'];
            document.querySelector('#chat-log').value += (message + '\n');
        }
    }
    componentDidMount(){
        axios({
            url:`http://127.0.0.1:8000/comments/`,
            method:'get',
            withCredentials:true,
            
        }).then(response=>{
            
            //console.log(response.data[0].bug)
            this.setState({
                comments:response.data
            })
            
        })
        axios({
            url:`http://127.0.0.1:8000/users/reqlogin/`,
            method:'get',
            withCredentials:true,
            
        }).then(response=>{
            console.log(response)
            //console.log(response.data[0].bug)
            this.setState({
                user:response.data
            })
            
        })
    }
    sendMessage(){
        var messageInputDom = document.querySelector('#chat-message-input');
        var message = messageInputDom.value;
      
        message =this.state.user.id + ' '+ this.props.id + ' ' + message;
        console.log(message)
        this.state.chatSocket.send(JSON.stringify({
            'message': message
        }));

        messageInputDom.value = '';
    }
    keyUp = (e) => {
        if (e.keyCode === 13) {  // enter, return
            document.querySelector('#chat-message-submit').click();
        }

    }
    render() {
        let postdata=<div>
        <form>
            <textarea id="chat-log" cols="100" rows="5"></textarea><br />

            <input id="chat-message-input" type="text" size="100" onKeyUp={this.keyUp} /><br />
             
            <input id="chat-message-submit" type="button" value="Send" onClick={this.sendMessage} />
        </form>
    </div>
        return (
            <div>
            <div className='comment-list'>
            <Comment.Group size='small'>
            <Header as='h3'>Comments</Header>
            
            
                {this.state.comments.filter(comment=>comment.bug===this.props.id).map(comment=>{
                    return(<div className='com'>
                        <Comment key={comment.id}>
                    <Comment.Content>
                    <Comment.Author>
                    {comment.creator}
                    </Comment.Author>
                    <Comment.Metadata>
                    {comment.comment_date}
                    </Comment.Metadata>
                    </Comment.Content>
                    <Comment.Text>
                    {ReactHtmlParser(comment.description)}
                    </Comment.Text>
                    </Comment></div>)
                }     
                    
                )}
            </Comment.Group>
            </div>
                {this.state.user.id?postdata:''}
            </div>
        )
    }
}

export default CommentList
