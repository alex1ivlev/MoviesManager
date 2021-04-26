import React from 'react'
import { BrowserRouter as Router,Redirect,  Route, Switch } from 'react-router-dom'

import { NavBar } from '../components/NavBar'
import { MoviesList, AddMovie, EditMovie, Login } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'
import jwtDecode from "jwt-decode";
import AllMembers from "../pages/Members/AllMembers";
import AddMember from "../pages/Members/AddMember";
import {Home} from "../components";
import Movies from "../components/Movies";
import Subscriptions from "../components/Subscriptions";
import EditMember from "../pages/Members/EditMember";

const isLoggedIn = () => {
    if(localStorage.getItem('token') != null){
        let token = localStorage.getItem('token')
        const { exp } = jwtDecode(token)
        // Refresh the token a minute early to avoid latency issues
        const expirationTime = (exp * 1000) - 60000
        if (Date.now() >= expirationTime) {
            localStorage.removeItem('token');
            return false
        }
        return true;
    }
    return false;
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        isLoggedIn()
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
)

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/login" exact component={Login} />
                <PrivateRoute path="/home" exact component={Home} />
                <PrivateRoute path="/movies" exact component={Movies} />
                <PrivateRoute path="/movies/list" exact component={MoviesList} />
                <PrivateRoute path="/movies/create" exact component={AddMovie} />
                <PrivateRoute
                    path="/movies/update/:id"
                    exact
                    component={EditMovie}
                />
                <PrivateRoute path="/subscriptions" exact component={Subscriptions} />
                <PrivateRoute path="/members/list" exact component={AllMembers} />
                <PrivateRoute path="/members/create" exact component={AddMember} />
                <PrivateRoute
                    path="/members/update/:id"
                    exact
                    component={EditMember}
                />

            </Switch>
        </Router>
    )
}

export default App
