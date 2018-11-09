import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import CommentView from './components/CommentView/CommentView';
import ReplyList from './components/ReplyList/ReplyList';
import CommentBox from '../CommentBox/CommentBox';
import styles from './CommentFlow.less';
import { STATUS } from '../../../../common/constants';

class CommentFlow extends PureComponent {
    state = {
        collapsed: true,
        editorOpened: false,
        replyTo: {
            userId: null,
            userName: null,
        },
    };

    static propTypes = {
        projectId: PropTypes.any.isRequired,
        comment: PropTypes.any.isRequired,
    };

    componentWillReceiveProps(nextProps) {
        const { editorStatus } = this.props;
        const { editorStatus: nextEditorStatus } = nextProps;
        if (editorStatus === STATUS.sending && nextEditorStatus === STATUS.completed) {
            this.setState({ editorOpened: false });
        }
    }

    onExpandCollapse = () => {
        const { collapsed } = this.state;
        this.setState({ collapsed: !collapsed });
    };

    onReply = receiver => {
        const { editorOpened, replyTo } = this.state;
        const { editorStatus } = this.props;
        const posting = STATUS.sending === editorStatus;
        if (!posting) {
            if (replyTo.userId === receiver.userId) {
                this.setState({ editorOpened: !editorOpened });
            } else {
                this.setState({ editorOpened: true, replyTo: receiver });
            }
        }
    };

    render() {
        const { collapsed, editorOpened, replyTo } = this.state;
        const { projectId, comment } = this.props;
        const replies = (
            <ReplyList
                hide={collapsed}
                className={styles.replies}
                projectId={projectId}
                parentId={comment.id}
                onReply={this.onReply}
            />
        );

        return (
            <div className={styles.container}>
                <CommentView
                    userId={comment.investor_id}
                    avatarUrl={comment.avatar_url}
                    userName={comment.investor_name}
                    createdTime={comment.created_time}
                    replyNumber={comment.reply_number}
                    content={comment.comment}
                    collapsed={collapsed}
                    allowRepliesShown
                    onReply={this.onReply}
                    onExpandCollapse={this.onExpandCollapse}
                />
                {replies}
                <CommentBox
                    projectId={projectId}
                    commentId={comment.id}
                    replyTo={replyTo}
                    className={styles.editor}
                    show={editorOpened}
                />
            </div>
        );
    }
}

const mapStateToProps = ({ comment }, { comment: propComment }) => {
    if (propComment) {
        return {
            editorStatus: comment.data.get(propComment.id).editorStatus,
        };
    }
    return { editorStatus: null };
};

export default connect(mapStateToProps)(CommentFlow);
