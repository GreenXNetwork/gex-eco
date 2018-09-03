import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { defineMessages, injectIntl } from 'react-intl';
import styles from './ProjectsExplorer.less';
import ProjectSider from './components/ProjectSider/ProjectSider';
import { getMenuData } from './projectmenu';
import { Layout } from 'antd';
import banner from '../../assets/projectlist/banner.png';
import ProjectList from './components/ProjectList/ProjectList';

const { Content, Header, Footer } = Layout;

const messages = defineMessages({
    notification_empty: {
        id: 'BasicLayout.notification.empty',
        defaultMessage: `empty {type}`,
    },
});

class ProjectsExplorer extends Component {
    handleMenuCollapse = collapsed => {
        const { dispatch } = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };

    render() {
        const { intl, collapsed, location } = this.props;
        return (
            <Layout>
                <ProjectSider
                    menuData={getMenuData()}
                    collapsed={collapsed}
                    location={location}
                    isMobile={false}
                    onCollapse={this.handleMenuCollapse}
                />
                <Content>
                    <div>
                        <img className={styles.banner} src={banner} />
                    </div>
                    <div className={styles.maincontent}>
                        <ProjectList />
                    </div>
                </Content>
            </Layout>
        );
    }
}

const propTypes = {
    intl: PropTypes.object.isRequired,
};
ProjectsExplorer.propTypes = propTypes;

const mapStateToProps = ({ global = {} }) => ({
    collapsed: global.collapsed,
});

export default injectIntl(connect(mapStateToProps)(ProjectsExplorer), { withRef: true });
