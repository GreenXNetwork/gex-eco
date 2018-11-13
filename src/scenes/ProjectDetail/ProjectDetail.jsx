import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Modal, Spin, Tabs, Row, Col, Layout } from 'antd';
import Carousel from 'react-image-carousel';
import { StickyContainer } from 'react-sticky';
import Developer from '../Developer/Developer';
import styles from './ProjectDetail.less';
import DetailView from './components/DetailView/DetailView';
import ProjectInvestorList from './components/ProjectInvestorList/ProjectInvestorList';
import CommentFlowList from './components/CommentFlowList/CommentFlowList';
import CommentBox from './components/CommentBox/CommentBox';
import StoryPane from './components/StoryPane/StoryPane';
import UpdateList from './components/UpdateList/UpdateList';

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
        defaultMessage: 'COMMENTS {value}',
    },
    tab_investors: {
        id: 'ProjectDetail.tab.investors',
        defaultMessage: 'INVESTORS {value}',
    },
});

class ProjectDetail extends Component {
    state = { visible: false };

    componentDidMount() {
        const { dispatch, match } = this.props;
        // See models/projectdetail.js for more effects and actions.
        dispatch({
            type: 'projectdetail/fetchProjectDetail',
            payload: { projectId: match.params.id },
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
        const { intl, projectdetail, loading, match, investorNumber, commentNumber } = this.props;
        let isLoading = loading.effects['projectdetail/fetchProjectDetail'];
        isLoading = isLoading === undefined ? true : isLoading;
        const projectId = parseInt(match.params.id, 10);

        if (isLoading) {
            return <Spin size="large" />;
        }

        const { detail } = projectdetail;

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
                    <Tabs defaultActiveKey="story" onChange={this.callback} tabPosition="top">
                        <TabPane tab={intl.formatMessage(messages.tab_story)} key="story">
                            <StoryPane projectId={projectId} />
                        </TabPane>
                        <TabPane tab={intl.formatMessage(messages.tab_updates)} key="updates">
                            <UpdateList projectId={projectId} />
                        </TabPane>
                        <TabPane
                            tab={intl.formatMessage(messages.tab_comments, {
                                value: `(${commentNumber})`,
                            })}
                            key="comments"
                        >
                            <div className={styles.comments}>
                                <CommentFlowList projectId={projectId} />
                                <CommentBox
                                    className={styles.editor}
                                    projectId={projectId}
                                    commentId={null}
                                    replyTo={null}
                                />
                            </div>
                        </TabPane>
                        <TabPane
                            tab={intl.formatMessage(messages.tab_investors, {
                                value: `(${investorNumber})`,
                            })}
                            key="investors"
                        >
                            <ProjectInvestorList
                                className={styles.investors}
                                projectId={projectId}
                            />
                        </TabPane>
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

const mapStateToProps = ({ loading, projectdetail, investor, comment }) => ({
    loading,
    projectdetail,
    investorNumber: investor.total,
    commentNumber: comment.total,
});

export default injectIntl(connect(mapStateToProps)(ProjectDetail), { withRef: true });
