import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import { injectIntl, defineMessages } from 'react-intl';
import CommentView from '../CommentView/CommentView';

const messages = defineMessages({
    showMoreButton: {
        id: 'ReplyList.button.showmore',
        defaultMessage: 'more replies',
    },
});

class ReplyList extends PureComponent {
    componentWillReceiveProps(nextProps) {
        const { hide: prevHide } = this.props;
        const { hide: nextHide } = nextProps;
        if (prevHide !== nextHide) {
            const { loading, replies } = nextProps;
            if (!loading && replies.length === 0) {
                this.getData();
            }
        }
    }

    getData = () => {
        const { dispatch, parentId, projectId } = this.props;
        dispatch({
            type: 'comment/fetchMoreReplies',
            payload: {
                commentId: parentId,
                projectId,
            },
        });
    };

    onLoadMore = () => {
        this.getData();
    };

    render() {
        const { intl, loading, replies, className, hide, onReply, parentId } = this.props;

        if (hide) {
            return null;
        }

        const loadMore = (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                <Button disabled={loading} onClick={this.onLoadMore}>
                    {intl.formatMessage(messages.showMoreButton)}
                </Button>
            </div>
        );

        return (
            <List
                className={className}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={replies}
                renderItem={item => (
                    <List.Item>
                        <CommentView
                            parentId={parentId}
                            userId={item.investor_id}
                            avatarUrl={item.investor_image_url || '/default-avatar.png'}
                            userName={item.investor_name}
                            createdTime={item.created_time}
                            replyNumber={item.reply_number}
                            content={item.comment}
                            isCampainger={item.is_campaigner}
                            collapsed
                            allowRepliesShown={false}
                            onReply={onReply}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

const defaultProps = {
    onReply: () => {},
};
ReplyList.defaultProps = defaultProps;

const propTypes = {
    projectId: PropTypes.any.isRequired,
    parentId: PropTypes.any.isRequired,
    onReply: PropTypes.func,
};
ReplyList.propTypes = propTypes;

const mapStateToProps = ({ comment }, { parentId }) => ({
    loading: comment.data.get(parentId).loading,
    replies: comment.data.get(parentId).replies,
});

export default injectIntl(connect(mapStateToProps)(ReplyList));
