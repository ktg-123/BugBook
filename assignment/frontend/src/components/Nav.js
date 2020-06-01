import React, { Component } from 'react'
import '../styles/nav.css'
import {Link} from 'react-router-dom'
import {Header, Button} from 'semantic-ui-react'
class Nav extends Component {
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
                <li>Logout</li>
                
                </ul>
            </nav>
        )
    }
}

export default Nav
