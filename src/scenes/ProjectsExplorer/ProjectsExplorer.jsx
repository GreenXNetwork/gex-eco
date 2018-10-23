import React, { Component } from 'react';
import { connect } from 'dva';
import { injectIntl } from 'react-intl';
import { Layout, Alert } from 'antd';
import ProjectSider from './components/ProjectSider/ProjectSider';
import { getMenuData } from '../../common/projectmenu';
import banner from '../../assets/projectlist/banner.png';
import ProjectList from './components/ProjectList/ProjectList';
import styles from './ProjectsExplorer.less';

const { Content } = Layout;

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
        const { collapsed, location, match } = this.props;
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
                        <img alt="" className={styles.banner} src={banner} />
                    </div>
                    <div className={styles.maincontent}>
                        <ProjectList location={location} match={match} />
                    </div>
                </Content>
            </Layout>
        );
    }
}

const mapStateToProps = ({ global = {} }) => ({
    collapsed: global.collapsed,
});

export default injectIntl(connect(mapStateToProps)(ProjectsExplorer), { withRef: true });
