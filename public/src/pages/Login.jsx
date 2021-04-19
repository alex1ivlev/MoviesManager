import React, {Component} from 'react'
import {login} from "../api";
import styled from 'styled-components';


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

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
        }
    }

    handleChangeInputUsername = async event => {
        const username = event.target.value
        this.setState({username})
    }

    handleChangeInputPassword = async event => {
        const password = event.target.value
        this.setState({password})
    }


    handleLogin = async (e) => {
        e.preventDefault()
        this.setState({"message": ""})
        const {username, password} = this.state
        const payload = {username, password};
        login(payload)
            .then((res)=> {
                localStorage.setItem('token', res.data.token);
                this.props.history.push("/home");
            })
            .catch(res=>{
                localStorage.removeItem('token');
                this.setState({"message": "Wrong password or username"})
            })
    }

    componentDidMount = async () => {
    }

    render() {
        return (
            <Wrapper>
                <Title>Login</Title>

                <form onSubmit={this.handleLogin}>

                    <Label>Username: </Label>
                    <InputText
                        type="text"
                        required={true}
                        onChange={this.handleChangeInputUsername}
                    />

                    <Label>Password: </Label>
                    <InputText
                        type="password"
                        required={true}
                        onChange={this.handleChangeInputPassword}
                    />

                    <Button type="submit"> Login </Button>

                    {this.state.message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {this.state.message}
                            </div>
                        </div>
                    )}
                </form>
            </Wrapper>
        )
    }
}

export default Login
