import React from 'react';
import PropTypes from 'prop-types';
import { Layout, message } from 'antd';
import DocumentTitle from 'react-document-title';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { ContainerQuery } from 'react-container-query';
import classNames from 'classnames';
import pathToRegexp from 'path-to-regexp';
import { defineMessages, FormattedMessage } from 'react-intl';
import GlobalHeader from '../components/GlobalHeader';
import NotFound from '../components/Exception/404';
import { getRoutes } from '../utils/utils';
import Authorized from '../utils/Authorized';
import { getMenuData, getNavMenuData } from '../common/menu';
import logo from '../assets/logo.svg';
import fulllogo from '../assets/fulllogo_big.png';
import { injectIntl } from '../common/decorator';

const { Header } = Layout;
const { AuthorizedRoute, check } = Authorized;

const messages = defineMessages({
    notification_empty: {
        id: 'ProjectsLayout.notification.empty',
        defaultMessage: `empty {type}`,
    },
    copyright: {
        id: 'UserLayout.copyright',
        defaultMessage: 'Copyright',
    },
    copyrightMessage: {
        id: 'UserLayout.copyrightMessage',
        defaultMessage: '2018 GreenX Network',
    },
});

const redirectData = [];
const getRedirect = item => {
    if (item && item.children) {
        if (item.children[0] && item.children[0].path) {
            redirectData.push({
                from: `${item.path}`,
                to: `${item.children[0].path}`,
            });
            item.children.forEach(children => {
                getRedirect(children);
            });
        }
    }
};
getMenuData().forEach(getRedirect);

/**
 * Get breadcrumb mapping
 * @param {Object} menuData
 * @param {Object} routerData
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
    const result = {};
    const childResult = {};
    for (const i of menuData) {
        if (!routerData[i.path]) {
            result[i.path] = i;
        }
        if (i.children) {
            Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
        }
    }
    return Object.assign({}, routerData, result, childResult);
};

const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};

@injectIntl()
@connect(({ user, global = {}, loading }) => ({
    currentUser: user.currentUser,
    collapsed: global.collapsed,
    fetchingNotices: loading.effects['global/fetchNotices'],
    notices: global.notices,
    mobile: global.mobile,
}))
export default class ProjectsLayout extends React.PureComponent {
    static childContextTypes = {
        location: PropTypes.object,
        breadcrumbNameMap: PropTypes.object,
    };

    getChildContext() {
        const { location, routerData } = this.props;
        return {
            location,
            breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData),
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'user/fetchCurrent',
        });
    }

    getPageTitle() {
        const { routerData, location } = this.props;
        const { pathname } = location;
        let title = 'GreenX Network';
        let currRouterData = null;
        // match params path
        Object.keys(routerData).forEach(key => {
            if (pathToRegexp(key).test(pathname)) {
                currRouterData = routerData[key];
            }
        });
        if (currRouterData && currRouterData.name) {
            title = `${currRouterData.name}`;
        }
        return title;
    }

    getBaseRedirect = () => {
        // According to the url parameter to redirect
        const urlParams = new URL(window.location.href);

        const redirect = urlParams.searchParams.get('redirect');
        // Remove the parameters in the url
        if (redirect) {
            urlParams.searchParams.delete('redirect');
            window.history.replaceState(null, 'redirect', urlParams.href);
        } else {
            const { routerData } = this.props;
            // get the first authorized route path in routerData
            const authorizedPath = Object.keys(routerData).find(
                item => check(routerData[item].authority, item) && item !== '/'
            );
            return authorizedPath;
        }
        return redirect;
    };

    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    handleNoticeClear = type => {
        message.success(<FormattedMessage {...messages.notification_empty} values={{ type }} />);
        const { dispatch } = this.props;
        dispatch({
            type: 'global/clearNotices',
            payload: type,
        });
    };

    handleMenuClick = ({ key }) => {
        const { dispatch } = this.props;
        if (key === 'profile') {
            dispatch(routerRedux.push('/account'));
            return;
        }
        if (key === 'triggerError') {
            dispatch(routerRedux.push('/exception/trigger'));
            return;
        }
        if (key === 'txhistory') {
            dispatch(routerRedux.push('/dex/txhistory'));
            return;
        }
        if (key === 'logout') {
            dispatch({
                type: 'login/logout',
            });
        }
    };

    handleNoticeVisibleChange = visible => {
        const { dispatch } = this.props;
        if (visible) {
            dispatch({
                type: 'global/fetchNotices',
            });
        }
    };

    render() {
        const {
            currentUser,
            collapsed,
            fetchingNotices,
            notices,
            routerData,
            match,
            mobile,
        } = this.props;
        const baseRedirect = this.getBaseRedirect();

        const layout = (
            <Layout>
                <Header style={{ padding: 0 }}>
                    <GlobalHeader
                        logo={logo}
                        fulllogo={fulllogo}
                        currentUser={currentUser}
                        fetchingNotices={fetchingNotices}
                        notices={notices}
                        collapsed={collapsed}
                        isMobile={mobile}
                        menus={getNavMenuData()}
                        onNoticeClear={this.handleNoticeClear}
                        onCollapse={this.handleMenuCollapse}
                        onMenuClick={this.handleMenuClick}
                        onNoticeVisibleChange={this.handleNoticeVisibleChange}
                    />
                </Header>
                <Layout style={{ height: '100%' }}>
                    <Switch>
                        {redirectData.map(item => (
                            <Redirect key={item.from} exact from={item.from} to={item.to} />
                        ))}
                        {getRoutes(match.path, routerData).map(item => (
                            <AuthorizedRoute
                                key={item.key}
                                path={item.path}
                                component={item.component}
                                exact={item.exact}
                                authority={item.authority}
                                redirectPath="/exception/403"
                            />
                        ))}
                        <Redirect exact from="/" to={baseRedirect} />
                        <Route render={NotFound} />
                    </Switch>
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}
