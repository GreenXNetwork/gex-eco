import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Spin, Tabs } from 'antd';
import Carousel from 'react-image-carousel';
import { StickyContainer, Sticky } from 'react-sticky';
import styles from './ProjectDetail.less';

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
    componentDidMount() {
        const { dispatch, match } = this.props;
        // See models/projectdetail.js for more effects and actions.
        dispatch({
            type: 'projectdetail/fetchProjectDetail',
            projectId: match.params.id,
        });
    }

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

        return (
            <div>
                <div>{JSON.stringify(detail)}</div>
                <div>{detail.category}</div>
                <div className={styles.imageSlideshow}>
                    <Carousel images={detail.media} thumb loop />
                </div>
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
