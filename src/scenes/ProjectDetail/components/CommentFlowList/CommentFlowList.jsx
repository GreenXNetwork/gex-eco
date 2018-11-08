import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Button, List } from 'antd';
import CommentFlow from '../CommentFlow/CommentFlow';

class CommentFlowList extends PureComponent {
    getData = () => {
        const { dispatch, projectId } = this.props;
        dispatch({
            type: 'comment/fetchMoreComments',
            payload: {
                projectId,
            },
        });
    };

    onLoadMore = () => {
        this.getData();
    };

    render() {
        const { className, initLoading, loading, comments, projectId } = this.props;

        const loadMore = (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                <Button disabled={initLoading || loading} onClick={this.onLoadMore}>
                    loading more
                </Button>
            </div>
        );
        return (
            <List
                className={className}
                loading={initLoading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={comments}
                renderItem={item => (
                    <List.Item>
                        <CommentFlow projectId={projectId} comment={item} />
                    </List.Item>
                )}
            />
        );
    }
}

const propTypes = {
    projectId: PropTypes.number.isRequired,
};
CommentFlowList.propTypes = propTypes;

const mapStateToProps = ({ loading, comment }) => ({
    initLoading: loading.effects['comment/fetchComments'],
    loading: loading.effects['comment/fetchMoreComments'],
    comments: comment.data.values(),
});

export default connect(mapStateToProps)(CommentFlowList);
