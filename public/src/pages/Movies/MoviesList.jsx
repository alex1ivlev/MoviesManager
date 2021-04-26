import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api from '../../api'

import styled from 'styled-components'

//update button style
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`
//delete button style
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
//update button BL

class UpdateMovie extends Component {
    updateMovie = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateMovie}>Update</Update>
    }
}

//delete button BL

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do you want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id).then(r => {
                this.props.onDelete(this.props.id);
            })

        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class MoviesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            isLoading: true,
        }
    }

    componentDidMount = () => {
        api.getAllMovies().then(resp => {
            this.setState({
                movies: resp.data,
                isLoading: false,
            })
        })
    }
    onDeleteCall = (id) =>{
        let movies = this.state.movies;
        let index = movies.findIndex(function(o){
            return o._id === id;
        })
        if (index !== -1) {
            movies.splice(index, 1);
            this.setState({
                movies: movies
            })
        }
    }

    render() {
        const { movies, isLoading } = this.state

        if(isLoading) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {movies.map(m => (
                        <Card key={m._id}>
                            <CardActionArea>
                                <CardMedia
                                    title={m.name}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        <div> {m.name}, {m.premiered} </div>
                                        <div> Genres: {m.genres} </div>
                                        <img src={m.image}/>
                                        <div>
                                        <Typography>
                                            Subscriptions Watched:
                                            {m.subscriptions}
                                        </Typography>
                                        </div>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {m.summary}
                                    </Typography>
                                    </CardContent>
                            </CardActionArea>
                            <CardActions>

                                <Button size="small" color="primary">
                                    <UpdateMovie id={m._id} />
                                </Button>

                                <Button size="small" color="primary">
                                    <DeleteMovie id={m._id} onDelete={this.onDeleteCall}/>
                                </Button>

                            </CardActions>
                        </Card>
                    ))}
                </ul>
            );
        }
    }
}

export default MoviesList
