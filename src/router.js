import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';
import { IntlProvider, loadLocaleData } from './components/ReactIntlContextProvider';

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

loadLocaleData(['en', 'zh']);

function RouterConfig({ history, app }) {
    const routerData = getRouterData(app);
    const UserLayout = routerData['/user'].component;
    const ProjectsLayout = routerData['/projects'].component;
    const BasicLayout = routerData['/'].component;

    return (
        <IntlProvider initialProps={{ locale: 'en', defaultLocale: 'en', messages: {} }}>
            <ConnectedRouter history={history}>
                <Switch>
                    <Route path="/user" component={UserLayout} />
                    <AuthorizedRoute
                        path="/projects"
                        render={props => <ProjectsLayout {...props} />}
                        authority={['admin', 'investor']}
                        redirectPath={getQueryPath('/user/login', {
                            redirect: window.location.href,
                        })}
                    />
                    <AuthorizedRoute
                        path="/"
                        render={props => <BasicLayout {...props} />}
                        authority={['admin', 'investor']}
                        redirectPath={getQueryPath('/user/login', {
                            redirect: window.location.href,
                        })}
                    />
                </Switch>
            </ConnectedRouter>
        </IntlProvider>
    );
}

export default RouterConfig;
