import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Button} from "@material-ui/core";

class Subscriptions extends Component {
    render() {
        return (

            <div>

                <Button>
                    <Link to="/members/list" className="nav-link">
                        All Members
                    </Link>
                </Button>

                <Button>
                    <Link to="/members/create" className="nav-link">
                        Add Member
                    </Link>
                </Button>

            </div>
        )
    }
}

export default Subscriptions
