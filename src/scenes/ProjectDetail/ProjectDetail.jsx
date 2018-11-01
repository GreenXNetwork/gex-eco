import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Modal, Spin, Tabs, Row, Col, Layout } from 'antd';
import Carousel from 'react-image-carousel';
import { StickyContainer, Sticky } from 'react-sticky';
import Developer from '../Developer/Developer';
import styles from './ProjectDetail.less';
import DetailView from './components/DetailView/DetailView';

const { TabPane } = Tabs;
const { Content } = Layout;

const messages = defineMessages({
    tab_story: {
        id: 'ProjectDetail.tab.story',
        defaultMessage: 'STORY',
    },
    tab_updates: {
        id: 'ProjectDetail.tab.updates',
        defaultMessage: 'UPDATES',
    },
    tab_comments: {
        id: 'ProjectDetail.tab.comments',
        defaultMessage: 'COMMENTS',
    },
    tab_investors: {
        id: 'ProjectDetail.tab.investors',
        defaultMessage: 'INVESTORS',
    },
});

class ProjectDetail extends Component {
    state = { visible: false };

    componentDidMount() {
        const { dispatch, match } = this.props;
        // See models/projectdetail.js for more effects and actions.
        dispatch({
            type: 'projectdetail/fetchProjectDetail',
            projectId: match.params.id,
        });
    }

    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    callback = () => {};

    render() {
        const { intl, projectdetail, loading } = this.props;
        let isLoading = loading.effects['projectdetail/fetchProjectDetail'];
        isLoading = isLoading === undefined ? true : isLoading;

        if (isLoading) {
            return <Spin size="large" />;
        }

        const { detail } = projectdetail;

        const renderTabBar = (props, DefaultTabBar) => (
            <Sticky bottomOffset={80}>
                {({ style }) => (
                    <DefaultTabBar
                        {...props}
                        style={{ ...style, zIndex: 1, background: 'transparent' }}
                    />
                )}
            </Sticky>
        );

        const { visible } = this.state;

        return (
            <Content className={styles.container}>
                <Row type="flex" gutter={24}>
                    <Col
                        className="gutter-row"
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 24 }}
                        xl={{ span: 16 }}
                        xxl={{ span: 14 }}
                    >
                        <div className={styles.imageSlideshow}>
                            <Carousel images={detail.media} thumb loop />
                        </div>
                    </Col>
                    <Col
                        className="gutter-row"
                        xs={{ span: 24 }}
                        sm={{ span: 24 }}
                        md={{ span: 24 }}
                        lg={{ span: 24 }}
                        xl={{ span: 8 }}
                        xxl={{ span: 10 }}
                    >
                        <DetailView detail={detail} onOwnerMore={this.showModal} />
                    </Col>
                </Row>
                <Modal
                    title="About"
                    className="project-owner"
                    visible={visible}
                    width="600px"
                    style={{ top: '50px', padding: '0px' }}
                    bodyStyle={{ padding: '0px' }}
                    onCancel={this.handleCancel}
                    footer={null}
                >
                    <Developer ownerId="1" />
                </Modal>
                <StickyContainer className="extraDetailContainer">
                    <Tabs
                        defaultActiveKey="story"
                        onChange={this.callback}
                        renderTabBar={renderTabBar}
                    >
                        <TabPane tab={intl.formatMessage(messages.tab_story)} key="story" />
                        <TabPane tab={intl.formatMessage(messages.tab_updates)} key="updates" />
                        <TabPane tab={intl.formatMessage(messages.tab_comments)} key="comments" />
                        <TabPane tab={intl.formatMessage(messages.tab_investors)} key="investors" />
                    </Tabs>
                </StickyContainer>
            </Content>
        );
    }
}

const propTypes = {
    intl: PropTypes.object.isRequired,
    loading: PropTypes.any.isRequired,
    projectdetail: PropTypes.any,
};
ProjectDetail.propTypes = propTypes;

const defaultProps = {
    projectdetail: {
        detail: undefined,
    },
};
ProjectDetail.defaultProps = defaultProps;

const mapStateToProps = ({ loading, projectdetail }) => ({
    loading,
    projectdetail,
});

export default injectIntl(connect(mapStateToProps)(ProjectDetail), { withRef: true });
