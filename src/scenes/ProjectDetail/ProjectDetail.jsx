import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Modal, Button, Spin, Tabs } from 'antd';
import Carousel from 'react-image-carousel';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './ProjectDetail.less';
import Developer from '../Developer/Developer';

const { TabPane } = Tabs;

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

    handleCancel = e => {
        console.log(e);
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
                    <DefaultTabBar {...props} style={{ ...style, zIndex: 1, background: '#000' }} />
                )}
            </Sticky>
        );

        const { visible } = this.state;

        return (
            <div>
                <div>{JSON.stringify(detail)}</div>
                <div>{detail.category}</div>
                <div className={styles.imageSlideshow}>
                    <Carousel images={detail.media} thumb loop />
                </div>
                <Button type="primary" onClick={this.showModal}>
                    Owner More!
                </Button>
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
                <StickyContainer>
                    <Tabs
                        defaultActiveKey="story"
                        onChange={this.callback}
                        renderTabBar={renderTabBar}
                    >
                        <TabPane tab={intl.formatMessage(messages.tab_story)} key="story">
                            Content of Tab Pane 1
                        </TabPane>
                        <TabPane tab={intl.formatMessage(messages.tab_updates)} key="updates">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab={intl.formatMessage(messages.tab_comments)} key="comments">
                            Content of Tab Pane 3
                        </TabPane>
                        <TabPane tab={intl.formatMessage(messages.tab_investors)} key="investors">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </StickyContainer>
            </div>
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
