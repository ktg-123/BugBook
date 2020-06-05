import React, { Component } from 'react'
import '../styles/nav.css'
import {Link} from 'react-router-dom'
import {Header, Button} from 'semantic-ui-react'
class Nav extends Component {
    constructor(props) {
        super(props)
        this.handleLogOut=this.handleLogOut.bind(this)
    }
    handleLogOut(){
        window.location="http://127.0.0.1:8000/users/onlogout"
    }
    render() {
        const navStyle={
            color:'white',
            textDecoration:'none'
        }
        
        return (
            <nav>
                <Header as='h1'>BugBook</Header>
                <ul className='nav-links'>
                <Link style={navStyle} to="/register">
                <Button color='blue'><li>Register App</li></Button>
                </Link>
                <Link style={navStyle} to="/dashboard">
                <li>Dashboard</li>
                </Link>
                <Link style={navStyle} to="/home">
                <li>Home</li>
                </Link>
                <Button color='twitter' onClick={this.handleLogOut}>
                <li>Logout</li>
                </Button>
                <Link style={navStyle} to="/adminview">
                <Button color='vk'><li>Admin View</li></Button>
                </Link>
                </ul>
            </nav>
        )
    }
}

export default Nav
