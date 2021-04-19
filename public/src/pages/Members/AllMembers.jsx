import React, { Component } from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import api, {getMemberMovies} from '../../api'

import styled from 'styled-components'

//update button style
const Edit = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`
//delete button style
const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
//update button BL

class EditMember extends Component {
    editUser = event => {
        event.preventDefault()
        window.location.href = `/members/update/${this.props.id}`
    }
    render() {
        return <Edit onClick={this.editUser}>Edit</Edit>
    }
}

//delete button BL

class DeleteMember extends Component {
    deleteUser = event => {
        event.preventDefault()
        if (
            window.confirm(
                `Do you want to delete this member permanently?`,
            )
        ) {
            api.deleteMemberById(this.props.id).then(r => {
                this.props.onDelete(this.props.id);
            })

        }
    }
    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}


class Members extends Component {

    constructor(props) {
        super(props)
        this.state = {
            members: [],
        }
    }

    componentDidMount = () => {
        api.getAllMembers().then(members => {
            this.setState({
                members: members.data,
            })
        })
    }
    onDelete = (id) =>{
        let members = this.state.members;
        let index = members.findIndex(function(u){
            return u._id === id;
        })
        if (index !== -1) {
            members.splice(index, 1);
            this.setState({
                members: members
            })
        }
    }

    render() {
        const { members} = this.state
        {
            return (
                <ul>
                    {members.map(m => (
                        <Card>
                            <CardActionArea>
                                <CardMedia/>
                                <Typography variant="h3" component="h3">
                                    Name : {m.name}
                                </Typography>
                                <CardContent>
                                    <Typography variant="h5" component="h2">
                                        <div> Email: {m.email}</div>
                                        <div> City: {m.city}</div>
                                    </Typography>
                                    <div> Movies watched: {m.movies}</div>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    <EditMember id={m._id} />
                                </Button>

                                <Button size="small" color="primary">
                                    <DeleteMember id={m._id} onDelete={this.onDelete}/>
                                </Button>

                            </CardActions>
                        </Card>
                    ))}
                </ul>
            );
        }
    }
}

export default Members
