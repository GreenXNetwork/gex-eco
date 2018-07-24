import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

class AuthenticatedRoute extends Component<{}, {}> {
    render() {
        const { component: Component, ...rest } = this.props;
        const loggedIn = this.props.loggedIn;
        return (
            <Route {...rest} render={
                (props) => (
                    loggedIn ? (
                        <Component {...props} />
                    ) : (
                            <Redirect to={{
                                pathname: '/login',
                                state: { from: props.location }
                            }} />
                        )
                )}
            />
        );
    }
}

// const AuthenticatedRoute = ({component: Component, ...rest}) => (
//     <Route {...rest} render={
//         (props) => (
//             props.loggedIn ? (
//                 <Component {...props}/>
//             ) : (
//                 <Redirect to={{
//                     pathname: '/login',
//                     state: { from: props.location }
//                 }}/>
//             )
//         )}
//     />
// );

const mapStateToProps = (state, ownProps) => ({
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(AuthenticatedRoute);