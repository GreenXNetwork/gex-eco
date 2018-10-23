import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Redirect } from 'react-router-dom';
import { NavLink, Switch, Route } from 'dva/router';
import { getMenuData } from '../../common/menu';
import NotFound from '../../components/Exception/404';
import Authorized from '../../utils/Authorized';
import { getRoutes } from '../../utils/utils';
import styles from './AccountMgmt.less';

const { AuthorizedRoute, check } = Authorized;
const { Header } = Layout;

const messages = defineMessages({
    nav_view_profile: {
        id: 'AccountMgmt.nav.view_profile',
        defaultMessage: 'View Profile',
    },
    nav_edit_profile: {
        id: 'AccountMgmt.nav.edit_profile',
        defaultMessage: 'Edit Profile',
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

class AccountMgmt extends Component {
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

    render() {
        const { intl, routerData, match } = this.props;
        const baseRedirect = this.getBaseRedirect();

        return (
            <Layout>
                <Header className={styles.header}>
                    <NavLink
                        className={styles.navItem}
                        activeClassName="nav-item-selected"
                        to="/account/view"
                    >
                        {intl.formatMessage(messages.nav_view_profile)}
                    </NavLink>
                    <NavLink
                        className={styles.navItem}
                        activeClassName="nav-item-selected"
                        to="/account/edit"
                    >
                        {intl.formatMessage(messages.nav_edit_profile)}
                    </NavLink>
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
    }
}

const mapStateToProps = ({ loading, user }) => ({
    loading,
    user: user.current,
});

export default injectIntl(connect(mapStateToProps)(AccountMgmt), { withRef: true });
