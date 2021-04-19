import React from "react";
import {getMemberMovies} from "../../api";
import {Card} from "@material-ui/core";


class MoviesWatched extends Component {

    constructor(props) {
        super(props)
        this.state = {
            movies:[]
        }
    }

    componentDidMount = () => {
        getMemberMovies().then(movies =>{
            this.setState({
                movies: movies.data
                })
            })
    };

    render() {
        const { } = this.state
        {
            return (
                <ul>
                    {this.movies.map(m => (
                        <Card>
                            {m.name}
                        </Card>
                    ))}

                </ul>
            );
        }
    }
}

export default MoviesWatched
