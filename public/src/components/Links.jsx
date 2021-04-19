import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Collapse = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collapse navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/home" className="navbar-brand">
                    Movie Subscriptions Web Site
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/movies" className="nav-link" >
                                Movies
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/subscriptions" className="nav-link">
                                Subscriptions
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/usermanagment" className="nav-link">
                                Users Management
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/login" className="nav-link">
                                Log Out
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
