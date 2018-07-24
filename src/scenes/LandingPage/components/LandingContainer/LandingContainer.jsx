import React, { Component } from "react";
import { connect } from "react-redux";
import LoginForm from './../../../../components/LoginForm/LoginForm';

class LandingContainer extends Component<{}, {}> {
    
    render() {
        return (
			<LoginForm {...this.props} />
		);
    }
}

export default connect()(LandingContainer);