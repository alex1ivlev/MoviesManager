import React, { Component } from 'react'
import styled from 'styled-components'

import Links from './Links'
import Movies from "./Movies";
import Subscriptions from './Subscriptions'

const Container = styled.div.attrs({
    className: 'container',
})`
    height: 150px;
`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-dark bg-dark',
})`
    margin-bottom: 20 px;
`

export class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Links>
                        <Movies/>
                        <Subscriptions/>
                    </Links>
                </Nav>
            </Container>
        )
    }
}

export default NavBar

