import React, { Component } from "react";
import { connect } from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import UserService from "../../services/UserService";

class ExchangePage extends Component<{}, {}> {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            hasError: false,
            error: "",
            projects: []
        };
    }

    componentDidMount() {
        this.fetchAllUsers();
    }

    render() {
        let reload = (
            <Button
                onClick={evt => this.fetchUser()}
            >
                Reload
            </Button>
        );
        if (this.state.hasError) {
            return (
                <div>
                    {reload}
                    <p>Sorry! There was an error loading the items</p>
                </div>
            );
        }

        if (this.state.isLoading) {
            return (
                <div>
                    {reload}
                    <LinearProgress />
                </div>
            );
        }

        let projectsAsString = JSON.stringify(this.state.projects);
        return (
            <div>
                {reload}
                <div>{projectsAsString}</div>
            </div>
        );
    }

    fetchAllUsers() {
        this.setState({ isLoading: true });
        UserService.getAllUsers()
        .then(response => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            this.setState({ isLoading: false });

            return response;
        })
        .then(response =>
            this.setState({
                projects: response
            })
        )
        .catch(err => {
            this.setState({
                error: err,
                hasError: true
            });
        });
    }

    fetchUser() {
        this.setState({ isLoading: true });
        UserService.getUser(1)
        .then(response => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            this.setState({ isLoading: false });

            return response;
        })
        .then(response =>
            this.setState({
                projects: response
            })
        )
        .catch(err => {
            this.setState({
                error: err,
                hasError: true
            });
        });
    }
}

export default connect()(ExchangePage);
