import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { Icon } from 'antd';
import GlobalFooter from '../components/GlobalFooter';
import styles from './UserLayout.less';
import logo from '../assets/x-transparent.png';
import { getRoutes, getPageQuery, getQueryPath } from '../utils/utils';
import { injectIntl, defineMessages, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import LanguageSelection from 'components/LanguageSelection';

const messages = defineMessages({
    pageTitle: {
        id: 'UserLayout.title',
        defaultMessage: 'GreenX',
    },
    pageDescription: {
        id: 'UserLayout.description',
        defaultMessage: 'GreenX Description :D',
    },
    copyright: {
        id: 'UserLayout.copyright',
        defaultMessage: 'Copyright',
    },
    copyrightMessage: {
        id: 'UserLayout.copyrightMessage',
        defaultMessage: '2018 GreenX Network',
    },
    footerHelp: {
        id: 'UserLayout.footer.help',
        defaultMessage: 'Help',
    },
    footerPrivacy: {
        id: 'UserLayout.footer.privacy',
        defaultMessage: 'Privacy',
    },
    footerTerms: {
        id: 'UserLayout.footer.terms',
        defaultMessage: 'Terms',
    },
});

function getLoginPathWithRedirectPath() {
    const params = getPageQuery();
    const { redirect } = params;
    return getQueryPath('/user/login', {
        redirect,
    });
}

class UserLayout extends React.PureComponent {
    getPageTitle() {
        const { routerData, location, intl } = this.props;
        const { pathname } = location;
        let title = intl.formatMessage(messages.pageTitle);
        if (routerData[pathname] && routerData[pathname].name) {
            title = `${routerData[pathname].name} - ${title}`;
        }
        return title;
    }

    render() {
        const { routerData, match, intl } = this.props;
        const description = intl.formatMessage(messages.pageDescription);

        const copyright = (
            <Fragment>
                {`${intl.formatMessage(messages.copyright)} `}
                <Icon type="copyright" />
                {` ${intl.formatMessage(messages.copyrightMessage)}`}
            </Fragment>
        );

        const links = [
            {
                key: 'help',
                title: intl.formatMessage(messages.footerHelp),
                href: '',
            },
            {
                key: 'privacy',
                title: intl.formatMessage(messages.footerPrivacy),
                href: '',
            },
            {
                key: 'terms',
                title: intl.formatMessage(messages.footerTerms),
                href: '',
            },
        ];

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.header}>
                                <Link to="/">
                                    <img alt="logo" className={styles.logo} src={logo} />
                                    <span className={styles.title}>
                                        {intl.formatMessage(messages.pageTitle)}
                                    </span>
                                </Link>
                            </div>
                            <div className={styles.desc}>{description}</div>
                            <div className={styles.langSel}>
                                <LanguageSelection />
                            </div>
                        </div>
                        <Switch>
                            {getRoutes(match.path, routerData).map(item => (
                                <Route
                                    key={item.key}
                                    path={item.path}
                                    component={item.component}
                                    exact={item.exact}
                                />
                            ))}
                            <Redirect from="/user" to={getLoginPathWithRedirectPath()} />
                        </Switch>
                    </div>
                    <GlobalFooter links={links} copyright={copyright} />
                </div>
            </DocumentTitle>
        );
    }
}

const propTypes = {
    intl: PropTypes.object.isRequired,
};
UserLayout.propTypes = propTypes;

export default injectIntl(UserLayout, {
    withRef: true,
});
