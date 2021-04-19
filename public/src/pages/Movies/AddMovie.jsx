import React, { Component } from 'react'
import styled from 'styled-components'
import {addMovie} from "../../api";

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

class AddMovie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            genres: [],
            premiered: '',
            image_url: '',
        }
    }

    handleInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleInputGenres = async event => {
        const genres = event.target.value
        this.setState({ genres })
    }

    handleInputPremiered = async event => {
        const premiered = event.target.value
        this.setState({ premiered })
    }
    handleInputImage = async event => {
        const image_url = event.target.value
        this.setState({ image_url })
    }

    handleIncludeMovie = () => {
        const { name, genres, premiered, image_url } = this.state
        const payload = { name, genres, premiered, image_url }

        addMovie(payload).then(res => {
            window.alert(`Movie added successfully`)
            this.setState({
                name: '',
                genres: '',
                premiered: '',
                image_url: ''
            })
        })
    }

    render() {
        const { name, genres, premiered, image_url } = this.state
        return (
            <Wrapper>
                <Title>Create Movie</Title>

                <Label> Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleInputName}
                />

                <Label>Genres: </Label>
                <InputText
                    type="text"
                    value={genres}
                    onChange={this.handleInputGenres}

                />

                <Label> Image url: </Label>
                <InputText
                    type="text"
                    value={image_url}
                    onChange={this.handleInputImage}
                />

                <Label>Premiered: </Label>
                <InputText
                    type="text"
                    value={premiered}
                    onChange={this.handleInputPremiered}
                />

                <Button onClick={this.handleIncludeMovie}> Add Movie </Button>
                <CancelButton href={'/movies/list'}> Cancel </CancelButton>
            </Wrapper>
        )
    }
}

export default AddMovie
