import React from 'react';
import { Button } from 'antd';
import { Link } from 'dva/router';
import Result from 'components/Result';
import styles from './RegisterResult.less';
import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';

const messages = defineMessages({
    view_mail_box_button: {
        id: 'RegisterResult.view_mail_box.button',
        defaultMessage: 'View Mailbox',
    },
    back_to_home_button: {
        id: 'RegisterResult.back_to_home.button',
        defaultMessage: 'Back to home',
    },
    title: {
        id: 'RegisterResult.page.title',
        defaultMessage: 'Your account {account} registration success',
    },
    description: {
        id: 'RegisterResult.page.description',
        defaultMessage:
            'The activation email has been sent to your email address and is valid for 24 hours. Please log in to the email in time and click the link in the email to activate the account.',
    },
});

const actions = (
    <div className={styles.actions}>
        <a href="">
            <Button size="large" type="primary">
                <FormattedMessage {...messages.view_mail_box_button} />
            </Button>
        </a>
        <Link to="/">
            <Button size="large">
                <FormattedMessage {...messages.back_to_home_button} />
            </Button>
        </Link>
    </div>
);

class RegisterResult extends React.PureComponent {
    render() {
        const { location, intl } = this.props;
        return (
            <Result
                className={styles.registerResult}
                type="success"
                title={
                    <div className={styles.title}>
                        <FormattedMessage
                            {...messages.title}
                            values={{
                                account: `${
                                    location.state
                                        ? location.state.account
                                        : 'AntDesign@greenx.network'
                                }`,
                            }}
                        />
                    </div>
                }
                description={intl.formatMessage(messages.description)}
                actions={actions}
                style={{ marginTop: 56 }}
            />
        );
    }
}

export default injectIntl(RegisterResult, { withRef: true });
