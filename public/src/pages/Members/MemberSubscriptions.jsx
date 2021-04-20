import React, {Component} from 'react'
import api from "../../api";
import Movie from "./Movie";

class MemberSubscriptions extends Component {

    constructor(props) {
        super(props)
        this.state = {
            notWatchedMovies: [],
            visible: false,
            selected_movie: null,
            member_movies: this.props.member_movies
        }
    }

    componentDidMount = () => {

    };
    addSubscription = () => {
        api.getAllMovies().then(resp => {
            let notWatchedMovies = resp.data.filter(movie => !movie.subscriptions.includes(this.props.member_id))
            this.setState({
                notWatchedMovies: notWatchedMovies,
                visible: true
            })
        })
    }

    handleSelectChange = (event) => {
        this.setState({selected_movie: event.target.value});
    }

    subscribe = () => {
        if (this.state.selected_movie === null) return

        api.addMovieToMember(this.props.member_id, this.state.selected_movie).then(resp => {
            let mm = this.state.member_movies
            mm.push(this.state.selected_movie)
            this.setState({member_movies: mm})
        })
    }


    render() {
        return (
            <div>
                <button onClick={this.addSubscription}> Subscribe to new movie</button>
                {this.state.visible ? (
                <div>
                    Add a new movie:
                    <select onChange={this.handleSelectChange}>
                        {this.state.notWatchedMovies.map(m => (
                            <option value={m._id}> {m.name} </option>
                        ))}
                    </select>
                    <button onClick={this.subscribe}>Subscribe</button>
                </div>
                ) : null}

                <ul>
                    {this.state.member_movies.map(movie_id => (
                        <Movie id={movie_id}/>
                    ))}

                </ul>
            </div>
        );
    }
}

export default MemberSubscriptions
