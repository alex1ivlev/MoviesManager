import React, { Component } from 'react'
import {addMember} from '../../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`margin: 15px 15px 15px 5px;
`

class AddMember extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ' ',
            email: ' ',
            city: ' ',
        }
    }

    handleInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleInputEmail = async event => {
        const email = event.target.value
        this.setState({ email })
    }

    handleInputCity = async event => {
        const city = event.target.value
        this.setState({ city })
    }

    handleAddNewMember = () => {
        const { name, email, city } = this.state
        const payload = { name, email, city }

        addMember(payload).then(res => {
            window.alert(`Member added `)
            this.setState({
                name: '',
                email: '',
                city: '',
            })
        })
    }

    render() {
        const { name, email, city } = this.state
        return (
            <Wrapper>
                <Title> Add New Member </Title>

                <Label> Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleInputName}
                />

                <Label> Email: </Label>
                <InputText
                    type="text"
                    value={email}
                    onChange={this.handleInputEmail}

                />

                <Label> City: </Label>
                <InputText
                    type="text"
                    value={city}
                    onChange={this.handleInputCity}
                />

                <Button onClick={this.handleAddNewMember}> Add Member </Button>
                <CancelButton href={'/members/list'}> Cancel </CancelButton>
            </Wrapper>
        )
    }
}

export default AddMember
