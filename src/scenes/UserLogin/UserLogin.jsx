import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert } from 'antd';
import Login from 'components/Login';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import styles from './UserLogin.less';

const { UserName, Password, Submit } = Login;

const messages = defineMessages({
    signInButton: {
        id: 'UserLogin.button.signin',
        defaultMessage: 'Sign In',
    },
    singUpButton: {
        id: 'UserLogin.button.signup',
        defaultMessage: 'Sign Up',
    },
    rememberMe: {
        id: 'UserLogin.link.remember_me',
        defaultMessage: 'Remember me',
    },
    forgotPassword: {
        id: 'UserLogin.link.forgot_password',
        defaultMessage: 'Forgot password',
    },
    incorrectUserPass: {
        id: 'UserLogin.warn.incorrect_user_pass',
        defaultMessage: 'Incorrect username or password (admin/888888)',
    },
});
class LoginPage extends Component {
    state = {
        type: 'account',
        autoLogin: true,
    };

    componentWillMount() {
        const { dispatch, login } = this.props;
        if (login && login.status === 'ok') {
            dispatch({
                type: 'login/loginRedirect',
            });
        }
    }

    shouldComponentUpdate(newProps) {
        const { dispatch } = this.props;
        if (newProps.login && newProps.login.status === 'ok') {
            dispatch({
                type: 'login/loginRedirect',
            });
        }
        return true;
    }

    handleSubmit = (err, values) => {
        const { type } = this.state;
        const { dispatch } = this.props;
        if (!err) {
            dispatch({
                type: 'login/login',
                payload: {
                    email: values.username,
                    password: values.password,
                    type,
                },
            });
        }
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };

    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };

    render() {
        const { login, submitting, intl } = this.props;
        const { type, autoLogin } = this.state;

        return (
            <div className={styles.main}>
                <Login defaultActiveKey={type} onSubmit={this.handleSubmit}>
                    {login.status === 'error' &&
                        login.type === 'account' &&
                        !submitting &&
                        this.renderMessage(intl.formatMessage(messages.incorrectUserPass))}
                    <UserName name="username" placeholder="admin/user" />
                    <Password name="password" placeholder="888888/123456" />
                    <div>
                        <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
                            <FormattedMessage {...messages.rememberMe} />
                        </Checkbox>
                        <a style={{ float: 'right' }} href="">
                            <FormattedMessage {...messages.forgotPassword} />
                        </a>
                    </div>
                    <Submit loading={submitting}>
                        <FormattedMessage {...messages.signInButton} />
                    </Submit>
                    <div className={styles.other}>
                        <Link className={styles.register} to="/user/register">
                            <FormattedMessage {...messages.singUpButton} />
                        </Link>
                    </div>
                </Login>
            </div>
        );
    }
}

const propTypes = {
    intl: PropTypes.object.isRequired,
};
LoginPage.propTypes = propTypes;

const mapStateToProps = ({ login, loading }) => ({
    login,
    submitting: loading.effects['login/login'],
});

export default injectIntl(connect(mapStateToProps)(LoginPage), { withRef: true });
