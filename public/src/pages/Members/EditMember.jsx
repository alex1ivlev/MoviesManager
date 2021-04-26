import React, {Component} from "react";
import {getMemberById, updateMemberById} from "../../api";
import styled from 'styled-components'

//styling components:
const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
  margin: 0 30px;
`

const Label = styled.label`
  margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
  margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
  margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
  margin: 15px 15px 15px 5px;
`
class EditMember extends Component{
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            name: ' ' ,
            email: ' ' ,
            city: ' '
        }
    }

    handleChangeName = async event => {
        const name = event.target.value
        this.setState( {name} )
    }

    handleChangeEmail = async event => {
        const email = event.target.value
        this.setState( {email} )
    }

    handleChangeCity = async event => {
        const city = event.target.value
        this.setState( { city})
    }

    handleUpdateMember = async () => {
        const {id, name, email, city} = this.state
        const payload = {name, email, city}
        updateMemberById(id, payload).then(res => {
            window.alert(`Member Updated successfully!`)
            this.setState({
                name: ' ',
                email: ' ',
                city: ' ',
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const updateMember = await getMemberById(id)

        this.setState( {
            name: updateMember.data.name,
            email: updateMember.data.email,
            city: updateMember.data.city
        })
    }

    render() {
        const {name, email, city } = this.state
        return(
            <Wrapper>
                <Title> Edit Member </Title>

                <Label> Name: </Label>
                <InputText
                    type = "text"
                    value = {name}
                    onChange = {this.handleChangeName}
                    />

                <Label> Email: </Label>
                <InputText
                    type = "text"
                    value = {email}
                    onChange = {this.handleChangeEmail()}
                />

                <Label> City: </Label>
                <InputText
                    type = "text"
                    value = {city}
                    onChange = {this.handleChangeCity}
                />

                <Button onClick={this.handleUpdateMember}> Update </Button>
                <CancelButton href = {'/members/list'} >  Cancel </CancelButton>
            </Wrapper>

        )
    }

}

export default EditMember
