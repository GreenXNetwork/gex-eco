import React, { Component } from "react";
import { connect } from "react-redux";
import { setLoggedIn } from "./../../services/auth/authAction";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

let user = {
    id: 6,
    name: "somebody"
};

const style = {
    margin: 15
};

class LoginForm extends Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        };
    }

    onSubmit(event) {
        event.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         this.props.dispatch(setLoggedIn(user));
        //     }
        // });

        this.props.dispatch(setLoggedIn(user));
    }

    render() {
        if (this.props.loggedIn) {
            const { from } = this.props.location.state || {
                from: { pathname: "/projects" }
            };
            return <Redirect to={from} />;
        }
        return (
            <div>
                <AppBar title="Login" />
                <TextField
                    hintText="Enter your Username"
                    label="Username"
                    onChange={(event, newValue) =>
                        this.setState({ username: newValue })
                    }
                />
                <br />
                <TextField
                    type="password"
                    hintText="Enter your Password"
                    label="Password"
                    onChange={(event, newValue) =>
                        this.setState({ password: newValue })
                    }
                />
                <br />
                <Button
                    variant="contained"
                    primary={true}
                    style={style}
                    onClick={event => this.onSubmit(event)}
                >
                    Submit
                </Button>
            </div>
        );
    }

    componentWillUnmount() {
        // this.props.form.resetFields();
    }
}

const mapStateToProps = (state, ownProps) => ({
    location: ownProps.location,
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(LoginForm);
