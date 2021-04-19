import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core";

class Movies extends Component {
    render() {

        return (

           <div>
               <Button>
                   <Link to="/movies/list" className="nav-link">
                       All Movies
                   </Link>
               </Button>

               <Button>
                   <Link to="/movies/create" className="nav-link">
                       Add Movie
                   </Link>
               </Button>
           </div>
        )
    }
}

export default Movies
