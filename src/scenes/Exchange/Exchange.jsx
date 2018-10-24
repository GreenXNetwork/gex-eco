import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import { Layout } from 'antd';
import { Switch, Route, Redirect } from 'dva/router';
import NotFound from '../../components/Exception/404';
import { getMenuData } from '../../common/exchangemenu';
import Authorized from '../../utils/Authorized';
import { getRoutes } from '../../utils/utils';
import ExchangeSider from './components/ExchangeSider/ExchangeSider';

const { AuthorizedRoute, check } = Authorized;

// const gexlogo = 'https://icobench.com/images/icos/icons/greenx.jpg';

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

class Exchange extends Component {
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

    render() {
        const { collapsed, location, routerData, match } = this.props;
        const baseRedirect = this.getBaseRedirect();

        return (
            <Layout>
                <ExchangeSider
                    menuData={getMenuData()}
                    collapsed={collapsed}
                    location={location}
                    isMobile={false}
                    onCollapse={this.handleMenuCollapse}
                />
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
        );
    }
}

const mapStateToProps = ({ global = {} }) => ({
    collapsed: global.collapsed,
});

export default injectIntl(connect(mapStateToProps)(Exchange), { withRef: true });
