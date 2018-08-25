import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Button, Select, Row, Col, Popover, Progress } from 'antd';
import styles from './UserRegister.less';
import { defineMessages, FormattedMessage } from 'react-intl';
import { injectIntl } from '../../common/decorator';

const messages = defineMessages({
    pageTitle: {
        id: 'UserRegister.page.title',
        defaultMessage: 'Register',
    },
    passw_strength_strong: {
        id: 'UserRegister.passw_strength.strong',
        defaultMessage: 'Strength: Strong',
    },
    passw_strength_medium: {
        id: 'UserRegister.passw_strength.medium',
        defaultMessage: 'Strength: Medium',
    },
    passw_strength_poor: {
        id: 'UserRegister.passw_strength.poor',
        defaultMessage: 'Strength: Poor',
    },
    passw_rule_invalid: {
        id: 'UserRegister.passw.rule.invalid',
        defaultMessage: 'Please enter at least 6 characters.',
    },
    passw_rule_required: {
        id: 'UserRegister.passw.rule.required',
        defaultMessage: 'Please enter your password!',
    },
    passw_placeholder: {
        id: 'UserRegister.passw.placeholder',
        defaultMessage: 'At least 6 characters, case sensitive password.',
    },
    passwconfirm_rule_required: {
        id: 'UserRegister.passwconfirm.rule.required',
        defaultMessage: 'Please confirm your password!',
    },
    passwconfirm_rule_mismatched: {
        id: 'UserRegister.passwconfirm.rule.mismatched',
        defaultMessage: 'Passwords do not match!',
    },
    passwconfirm_placeholder: {
        id: 'UserRegister.passwconfirm.placeholder',
        defaultMessage: 'Confirm Password',
    },
    email_rule_required: {
        id: 'UserRegister.email.rule.required',
        defaultMessage: 'Please enter your email address!',
    },
    email_rule_invalid: {
        id: 'UserRegister.email.rule.invalid_format',
        defaultMessage: 'Email address is in the wrong format!',
    },
    email_placeholder: {
        id: 'UserRegister.email.placeholder',
        defaultMessage: 'Email',
    },
    name_rule_required: {
        id: 'UserRegister.name.rule.required',
        defaultMessage: 'Please enter your name!',
    },
    name_placeholder: {
        id: 'UserRegister.name.placeholder',
        defaultMessage: 'Name',
    },
    captcha_rule_required: {
        id: 'UserRegister.captcha.rule.required',
        defaultMessage: 'Please enter verification code!',
    },
    captcha_placeholder: {
        id: 'UserRegister.captcha.placeholder',
        defaultMessage: 'Verification Code',
    },
    captcha_reCaptcha: {
        id: 'UserRegister.captcha.reCaptcha',
        defaultMessage: 'ReCaptcha',
    },
    register_button: {
        id: 'UserRegister.register.button',
        defaultMessage: 'Register',
    },
    to_signin: {
        id: 'UserRegister.to_signin',
        defaultMessage: 'Sign in with an existing account',
    },
});

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;

const passwordStatusMap = {
    ok: (
        <div className={styles.success}>
            <FormattedMessage {...messages.passw_strength_strong} />
        </div>
    ),
    pass: (
        <div className={styles.warning}>
            <FormattedMessage {...messages.passw_strength_medium} />
        </div>
    ),
    poor: (
        <div className={styles.error}>
            <FormattedMessage {...messages.passw_strength_poor} />
        </div>
    ),
};

const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};

@injectIntl()
@connect(({ register, loading }) => ({
    register,
    submitting: loading.effects['register/submit'],
}))
@Form.create()
export default class UserRegister extends Component {
    state = {
        count: 0,
        confirmDirty: false,
        visible: false,
        help: '',
        prefix: '86',
    };

    componentWillReceiveProps(nextProps) {
        const { form, dispatch } = this.props;
        const account = form.getFieldValue('mail');
        if (nextProps.register.status === 'ok') {
            dispatch(
                routerRedux.push({
                    pathname: '/user/register-result',
                    state: {
                        account,
                    },
                })
            );
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    onGetCaptcha = () => {
        let count = 59;
        this.setState({ count });
        this.interval = setInterval(() => {
            count -= 1;
            this.setState({ count });
            if (count === 0) {
                clearInterval(this.interval);
            }
        }, 1000);
    };

    getPasswordStatus = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        if (value && value.length > 9) {
            return 'ok';
        }
        if (value && value.length > 5) {
            return 'pass';
        }
        return 'poor';
    };

    handleSubmit = e => {
        e.preventDefault();
        const { form, dispatch } = this.props;
        form.validateFields({ force: true }, (err, values) => {
            const { prefix } = this.state;
            if (!err) {
                dispatch({
                    type: 'register/submit',
                    payload: {
                        ...values,
                        prefix,
                    },
                });
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        const { confirmDirty } = this.state;
        this.setState({ confirmDirty: confirmDirty || !!value });
    };

    checkConfirm = (rule, value, callback) => {
        const { form, intl } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback(intl.formatMessage(messages.passwconfirm_rule_mismatched));
        } else {
            callback();
        }
    };

    checkPassword = (rule, value, callback) => {
        const { intl } = this.props;
        if (!value) {
            this.setState({
                help: messages.passw_rule_required,
                visible: !!value,
            });
            callback('error');
        } else {
            this.setState({
                help: '',
            });
            const { visible, confirmDirty } = this.state;
            if (!visible) {
                this.setState({
                    visible: !!value,
                });
            }
            if (value.length < 6) {
                callback('error');
            } else {
                const { form } = this.props;
                if (value && confirmDirty) {
                    form.validateFields(['confirm'], { force: true });
                }
                callback();
            }
        }
    };

    changePrefix = value => {
        this.setState({
            prefix: value,
        });
    };

    renderPasswordProgress = () => {
        const { form } = this.props;
        const value = form.getFieldValue('password');
        const passwordStatus = this.getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

    render() {
        const { form, submitting, intl } = this.props;
        const { getFieldDecorator } = form;
        const { count, prefix, help, visible } = this.state;
        return (
            <div className={styles.main}>
                <h3>
                    <FormattedMessage {...messages.pageTitle} />
                </h3>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                        {getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: intl.formatMessage(messages.name_rule_required),
                                },
                            ],
                        })(
                            <Input
                                size="large"
                                placeholder={intl.formatMessage(messages.name_placeholder)}
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: intl.formatMessage(messages.email_rule_required),
                                },
                                {
                                    type: 'email',
                                    message: intl.formatMessage(messages.email_rule_invalid),
                                },
                            ],
                        })(
                            <Input
                                size="large"
                                placeholder={intl.formatMessage(messages.email_placeholder)}
                            />
                        )}
                    </FormItem>
                    <FormItem
                        help={help === undefined || help === '' ? '' : intl.formatMessage(help)}
                    >
                        <Popover
                            content={
                                <div style={{ padding: '4px 0' }}>
                                    {passwordStatusMap[this.getPasswordStatus()]}
                                    {this.renderPasswordProgress()}
                                    <div style={{ marginTop: 10 }}>
                                        {intl.formatMessage(messages.passw_rule_invalid)}
                                    </div>
                                </div>
                            }
                            overlayStyle={{ width: 240 }}
                            placement="right"
                            visible={visible}
                        >
                            {getFieldDecorator('password', {
                                rules: [
                                    {
                                        validator: this.checkPassword,
                                    },
                                ],
                            })(
                                <Input
                                    size="large"
                                    type="password"
                                    placeholder={intl.formatMessage(messages.passw_placeholder)}
                                />
                            )}
                        </Popover>
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: intl.formatMessage(
                                        messages.passwconfirm_rule_required
                                    ),
                                },
                                {
                                    validator: this.checkConfirm,
                                },
                            ],
                        })(
                            <Input
                                size="large"
                                type="password"
                                placeholder={intl.formatMessage(messages.passwconfirm_placeholder)}
                            />
                        )}
                    </FormItem>
                    <FormItem>
                        <Row gutter={8}>
                            <Col span={16}>
                                {getFieldDecorator('captcha', {
                                    rules: [
                                        {
                                            required: true,
                                            message: intl.formatMessage(
                                                messages.captcha_rule_required
                                            ),
                                        },
                                    ],
                                })(
                                    <Input
                                        size="large"
                                        placeholder={intl.formatMessage(
                                            messages.captcha_placeholder
                                        )}
                                    />
                                )}
                            </Col>
                            <Col span={8}>
                                <Button
                                    size="large"
                                    disabled={count}
                                    className={styles.getCaptcha}
                                    onClick={this.onGetCaptcha}
                                >
                                    {count
                                        ? `${count} s`
                                        : `${intl.formatMessage(messages.captcha_reCaptcha)}`}
                                </Button>
                            </Col>
                        </Row>
                    </FormItem>
                    <FormItem>
                        <Button
                            size="large"
                            loading={submitting}
                            className={styles.submit}
                            type="primary"
                            htmlType="submit"
                        >
                            {intl.formatMessage(messages.register_button)}
                        </Button>
                        <Link className={styles.login} to="/user/login">
                            {intl.formatMessage(messages.to_signin)}
                        </Link>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
