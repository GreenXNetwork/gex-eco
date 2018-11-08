import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CommentView from './components/CommentView/CommentView';
import ReplyList from './components/ReplyList/ReplyList';
import CommentBox from '../CommentBox/CommentBox';
import styles from './CommentFlow.less';

class CommentFlow extends PureComponent {
    state = {
        collapsed: true,
        editorOpened: false,
    };

    onExpandCollapse = () => {
        const { collapsed } = this.state;
        this.setState({ collapsed: !collapsed });
    };

    onReply = () => {
        const { editorOpened } = this.state;
        this.setState({ editorOpened: !editorOpened });
    };

    render() {
        const { collapsed, editorOpened } = this.state;
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
                <CommentBox show={editorOpened} />
            </div>
        );
    }
}

const propTypes = {
    projectId: PropTypes.any.isRequired,
    comment: PropTypes.any.isRequired,
};
CommentFlow.propTypes = propTypes;

export default CommentFlow;
