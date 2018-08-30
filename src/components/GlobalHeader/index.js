import React, { PureComponent } from 'react';
import { Menu, Icon, Spin, Tag, Dropdown, Avatar, Divider, Tooltip } from 'antd';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import Debounce from 'lodash-decorators/debounce';
import { Link } from 'dva/router';
import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import { defineMessages, injectIntl } from 'react-intl';

const messages = defineMessages({
    profile_menuitem: {
        id: 'GlobalHeader.account.profile_menuitem',
        defaultMessage: 'Profile',
    },
    logout_menuitem: {
        id: 'GlobalHeader.account.logout_menuitem',
        defaultMessage: 'Logout',
    },
    support: {
        id: 'GlobalHeader.support.title',
        defaultMessage: 'Support',
    },
    search_placeholder: {
        id: 'GlobalHeader.search.placeholder',
        defaultMessage: 'Search',
    },
});

class GlobalHeader extends PureComponent {
    componentWillUnmount() {
        this.triggerResizeEvent.cancel();
    }

    getNoticeData() {
        const { notices } = this.props;
        if (notices == null || notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = { ...notice };
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime).fromNow();
            }
            // transform id to item key
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {
                const color = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }[newNotice.status];
                newNotice.extra = (
                    <Tag color={color} style={{ marginRight: 0 }}>
                        {newNotice.extra}
                    </Tag>
                );
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    }

    toggle = () => {
        const { collapsed, onCollapse } = this.props;
        onCollapse(!collapsed);
        this.triggerResizeEvent();
    };
    /* eslint-disable*/
    @Debounce(600)
    triggerResizeEvent() {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
    }
    render() {
        const {
            currentUser = {},
            collapsed,
            isMobile,
            logo,
            onMenuClick,
            intl,
        } = this.props;
        const menu = (
            <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
                <Menu.Item disabled>
                    <Icon type="user" />
                    {intl.formatMessage(messages.profile_menuitem)}
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <Icon type="logout" />
                    {intl.formatMessage(messages.logout_menuitem)}
                </Menu.Item>
            </Menu>
        );

        return (
            <div className={styles.header}>
                {isMobile && [
                    <Link to="/" className={styles.logo} key="logo">
                        <img src={logo} alt="logo" width="32" />
                    </Link>,
                    <Divider type="vertical" key="line" />,
                ]}
                <Icon
                    className={styles.trigger}
                    type={collapsed ? 'menu-unfold' : 'menu-fold'}
                    onClick={this.toggle}
                />
                <div className={styles.right}>
                    <HeaderSearch
                        className={`${styles.action} ${styles.search}`}
                        placeholder={intl.formatMessage(messages.search_placeholder)}
                        dataSource={[]}
                        onSearch={value => {
                            console.log('input', value); // eslint-disable-line
                        }}
                        onPressEnter={value => {
                            console.log('enter', value); // eslint-disable-line
                        }}
                    />
                    <Tooltip title={intl.formatMessage(messages.support)}>
                        <a
                            target="_blank"
                            href="https://www.google.com"
                            rel="noopener noreferrer"
                            className={styles.action}
                        >
                            <Icon type="question-circle-o" />
                        </a>
                    </Tooltip>
                    {currentUser.name ? (
                        <Dropdown overlay={menu}>
                            <span className={`${styles.action} ${styles.account}`}>
                                <Avatar
                                    size="small"
                                    className={styles.avatar}
                                    src={currentUser.avatar}
                                />
                                <span className={styles.name}>{currentUser.name}</span>
                            </span>
                        </Dropdown>
                    ) : (
                        <Spin size="small" style={{ marginLeft: 8 }} />
                    )}
                </div>
            </div>
        );
    }
}

export default injectIntl(GlobalHeader, { withRef: true });
