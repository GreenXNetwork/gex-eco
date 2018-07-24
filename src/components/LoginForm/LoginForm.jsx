import React, { Component } from 'react';
import {
    Form,
    Button,
    Input
} from 'antd';
import { connect } from 'react-redux';
import { setLoggedIn } from './../../services/auth/authAction';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom';

let user = {
    id: 6,
    name: "somebody"
}

class LoginForm extends Component<{}, {}> {
    constructor(props) {
        super(props);
    }

    onSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
                // this.props.dispatch(commentsActionCreators.add(values));
                // TODO: invoke API to login here
                this.props.dispatch(setLoggedIn(user));
			}
		});
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        if (this.props.loggedIn) {
            const { from } = this.props.location.state || { from: { pathname: '/projects' } };
            return (<Redirect to={from} />);
        }
        return (
            <Form onSubmit={e => this.onSubmit(e)}>
				<Form.Item label="Email" hasFeedback>
					{getFieldDecorator('email', {
						rules: [{
							type: 'email', message: 'Please enter a valid email address',
						}, {
							required: true, message: 'Please enter your email',
						}]
					})(
						<Input
							type="email"
							placeholder="name@company.com"
						/>
					)}
				</Form.Item>
				<Form.Item label="Password" hasFeedback>
					{getFieldDecorator('password', {
						rules: [{ required: true, message: 'Please enter your rating' }],
					})(
						<Input
							type="password"
							placeholder="password"
						/>
					)}
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
        );
	}
	
	componentWillUnmount() {
		this.props.form.resetFields();
	}
}

const mapStateToProps = (state, ownProps) => ({
    location: ownProps.location,
    loggedIn: state.auth.loggedIn
});

export default connect(mapStateToProps)(Form.create()(LoginForm));