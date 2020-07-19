import React, { Component } from 'react'
import Nav from './Nav'
import BugForm from './BugForm'


class ReportBug extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             members:[],

        }
    }
    componentDidMount(){
        console.log(this.props.match.params.id)
    }
    render() {
        return (
            <div>
                <div>
                    <Nav />
                    <BugForm requestType="post" appId={this.props.match.params.id} btnText="Report" bugId={null}/>
                </div>
            </div>
        )
    }
}

export default ReportBug
