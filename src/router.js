import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import { getRouterData } from './common/router';
import Authorized from './utils/Authorized';
import { getQueryPath } from './utils/utils';
import { IntlProvider, loadLocaleData } from "./components/ReactIntlContextProvider";

const { ConnectedRouter } = routerRedux;
const { AuthorizedRoute } = Authorized;

loadLocaleData(['en', 'zh']);

function RouterConfig({ history, app }) {
  const routerData = getRouterData(app);
  const UserLayout = routerData['/demo/user'].component;
  const BasicLayout = routerData['/'].component;
  
  return (
      <IntlProvider initialProps={{ locale: "en", defaultLocale: "en", messages: {} }}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/user" component={UserLayout} />
            <AuthorizedRoute
              path="/"
              render={props => <BasicLayout {...props} />}
              authority={['admin', 'user']}
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
