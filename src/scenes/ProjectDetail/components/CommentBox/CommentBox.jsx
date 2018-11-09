import React, { PureComponent } from 'react';
import { Input, Button } from 'antd';
import { injectIntl, defineMessages } from 'react-intl';
import { PropTypes } from 'prop-types';
import { connect } from 'dva';
import styles from './CommentBox.less';
import { STATUS } from '../../../../common/constants';

const { TextArea } = Input;

const messages = defineMessages({
    sendCommentButton: {
        id: 'CommentBox.button.send',
        defaultMessage: 'Send',
    },
});

class CommentBox extends PureComponent {
    state = {
        value: '',
    };

    static defaultProps = {
        show: true,
        replyTo: null,
        commentId: null,
    };

    static propTypes = {
        show: PropTypes.bool,
        replyTo: PropTypes.any,
        projectId: PropTypes.number.isRequired,
        commentId: PropTypes.number,
    };

    componentWillReceiveProps(nextProps) {
        const { replyTo } = this.props;
        const { replyTo: nextReplyTo } = nextProps;
        if (replyTo && nextReplyTo && nextReplyTo !== replyTo) {
            this.setState({ value: `@${nextReplyTo.userName}: ` });
        }
    }

    onTextChange = e => {
        this.setState({ value: e.target.value });
    };

    onClickSend = () => {
        const { projectId, commentId, dispatch } = this.props;
        const { value } = this.state;

        dispatch({
            type: 'comment/postComment',
            payload: {
                projectId,
                commentId,
                userId: null,
                comment: value,
            },
        });
    };

    render() {
        const { value } = this.state;
        const { intl, className, show, posting } = this.props;

        if (show) {
            return (
                <div className={className}>
                    <TextArea
                        className={styles.editor}
                        rows={4}
                        value={value}
                        onChange={this.onTextChange}
                        disabled={posting}
                    />
                    <div className={styles.actionbar}>
                        <Button type="primary" loading={posting} onClick={this.onClickSend}>
                            {intl.formatMessage(messages.sendCommentButton)}
                        </Button>
                    </div>
                </div>
            );
        }

        return null;
    }
}

const mapStateToProps = ({ comment }, { commentId }) => {
    if (commentId) {
        return {
            posting: comment.data.get(commentId)
                ? comment.data.get(commentId).editorStatus === STATUS.sending
                : false,
        };
    }

    return { posting: comment.editorStatus === STATUS.sending };
};

export default injectIntl(connect(mapStateToProps)(CommentBox));
