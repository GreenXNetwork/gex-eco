import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'dva';
import { Tabs, Spin } from 'antd';
import AboutMe from './components/AboutMe/AboutMe';
import styles from './ProfileView.less';

const { TabPane } = Tabs;

const messages = defineMessages({
    tab_profile: {
        id: 'ProfileView.tab.profile',
        defaultMessage: 'Profile',
    },
    tab_campaigns: {
        id: 'ProfileView.tab.campaigns',
        defaultMessage: 'Campaigns',
    },
    tab_contributions: {
        id: 'ProfileView.tab.contributions',
        defaultMessage: 'Contributions',
    },
});

class ProfileView extends Component {
    componentDidMount() {
        const { dispatch, isLoading } = this.props;
        if (isLoading === undefined) {
            dispatch({
                type: 'user/fetchCurrent',
            });
        }
    }

    render() {
        const { intl, isLoading, current } = this.props;

        if (isLoading === undefined || isLoading === true) {
            return (
                <div className="loading-container">
                    <Spin size="large" />
                </div>
            );
        }

        return (
            <div className={styles.container}>
                <p className={styles.user}>{current.name}</p>
                <div>
                    <Tabs defaultActiveKey="profile">
                        <TabPane
                            className={styles.tabHeader}
                            tab={intl.formatMessage(messages.tab_profile)}
                            key="profile"
                        >
                            <AboutMe userId={current.id} />
                        </TabPane>
                        <TabPane
                            className={styles.tabHeader}
                            tab={intl.formatMessage(messages.tab_campaigns)}
                            key="campaigns"
                        />
                        <TabPane
                            className={styles.tabHeader}
                            tab={intl.formatMessage(messages.tab_contributions)}
                            key="contributions"
                        />
                    </Tabs>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ loading, user }) => ({
    isLoading: loading.effects['user/fetchCurrent'],
    current: user.currentUser,
});

export default injectIntl(connect(mapStateToProps)(ProfileView), { withRef: true });
