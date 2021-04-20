import React, { Component } from 'react'
import { getMovieById} from "../../api";
import {Card} from "@material-ui/core";


class Movie extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movie: { }
        }
    }

    componentDidMount = () => {
        getMovieById(this.props.id).then(resp =>{
            this.setState({
                movie: resp.data
                })
            })
    };

    render() {
        const {movie} = this.state
        {
            return (
                <Card>
                    {movie.name}
                </Card>
            );
        }
    }
}

export default Movie
