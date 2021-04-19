import React, { Component } from 'react'
import {updateMovieById, getMovieById} from '../../api'
import styled from 'styled-components'

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

class EditMovie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            name: '',
            genres: '',
            premiered: '',
            image_url: ''
        }
    }

    handleChangeInputName = async event => {
        const name = event.target.value
        this.setState({ name })
    }

    handleChangeInputGenres = async event => {
        const genres = event.target.value
        this.setState({ genres })
    }

    handleChangeInputPremiered = async event => {
        const premiered = event.target.value
        this.setState({ premiered })
    }

    handleChangeInputImage = async event => {
        const image_url = event.target.value
        this.setState({ image_url })
    }

    handleUpdateMovie = async () => {
        const { id, name, genres, premiered, image_url } = this.state
        const payload = { name, genres, premiered, image_url }

        updateMovieById(id, payload).then(res => {
            window.alert(`Movie updated successfully`)
            this.setState({
                name: '',
                genres: '',
                premiered: '',
                image_url: ' '
            })
        })
    }

    componentDidMount = async () => {
        const { id } = this.state
        const movie = await getMovieById(id)

        this.setState({
            name: movie.data.name,
            genres: movie.data.genres,
            premiered: movie.data.premiered,
            image_url: movie.data.image_url
        })
    }

    render() {
        const { name, genres, premiered, image_url } = this.state
        return (
            <Wrapper>
                <Title>Edit Movie</Title>

                <Label>Name: </Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.handleChangeInputName}
                />

                <Label>Genres: </Label>
                <InputText
                    type="text"
                    value={genres}
                    onChange={this.handleChangeInputGenres}
                />

                <Label> Image url: </Label>
                <InputText
                    type="text"
                    value={image_url}
                    onChange={this.handleChangeInputImage}
                />

                <Label>Premiered: </Label>
                <InputText
                    type="text"
                    value={premiered}
                    onChange={this.handleChangeInputPremiered}
                />

                <Button onClick={this.handleUpdateMovie}> Update Movie </Button>
                <CancelButton href={'/movies/list'}> Cancel </CancelButton>
            </Wrapper>
        )
    }
}

export default EditMovie
