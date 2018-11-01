import React, { Fragment } from 'react';
import { Link, Redirect, Switch, Route } from 'dva/router';
import DocumentTitle from 'react-document-title';
import { injectIntl, defineMessages } from 'react-intl';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import LanguageSelection from 'components/LanguageSelection';
import styles from './UserLayout.less';
import GlobalFooter from '../components/GlobalFooter';
import fulllogo from '../assets/fulllogo_big.png';
import { getRoutes, getPageQuery, getQueryPath } from '../utils/utils';

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
        // const description = intl.formatMessage(messages.pageDescription);

        const copyright = (
            <Fragment>
                {`${intl.formatMessage(messages.copyright)} `}
                <Icon type="copyright" />
                {` ${intl.formatMessage(messages.copyrightMessage)}`}
            </Fragment>
        );

        const links = [
            {
                key: 'privacy',
                title: intl.formatMessage(messages.footerPrivacy),
                href: 'https://drive.google.com/file/d/1Cb3Q9dLACsLeIJeAEnOOo6saepEC--TF/view',
                blankTarget: true,
            },
            {
                key: 'terms',
                title: intl.formatMessage(messages.footerTerms),
                href: 'https://drive.google.com/file/d/1MS8GpCBz0LyFkOEMNWghuvZ_bkM6WdYv/view',
                blankTarget: true,
            },
        ];

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.header}>
                                <Link to="/">
                                    <img alt="logo" className={styles.logo} src={fulllogo} />
                                    <span className={styles.title} />
                                </Link>
                            </div>
                            <div className={styles.desc}>
                                <h2>
                                    The World&apos;s Most Sophisticated
                                    <b>Green Energy Network</b>
                                </h2>
                            </div>
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
