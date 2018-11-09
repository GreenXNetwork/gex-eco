import React, { PureComponent } from 'react';
import { Avatar } from 'antd';
import { injectIntl, defineMessages } from 'react-intl';
import PropTypes from 'prop-types';
import commonmessages from '../../../../../../common/definedmessages';
import styles from './CommentView.less';
import { getRemainingTime } from '../../../../../../utils/time';

const messages = defineMessages({
    replyButton: {
        id: 'CommentView.button.reply',
        defaultMessage: 'Reply',
    },
    showButton: {
        id: 'CommentView.button.show',
        defaultMessage: 'Show Replies',
    },
    collapseButton: {
        id: 'CommentView.button.collapse',
        defaultMessage: 'Hide Replies',
    },
});

class CommentView extends PureComponent {
    static defaultProps = {
        parentId: null,
    };

    static propTypes = {
        parentId: PropTypes.number,
        userId: PropTypes.number.isRequired,
        avatarUrl: PropTypes.string.isRequired,
        userName: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        createdTime: PropTypes.number.isRequired,
        replyNumber: PropTypes.number.isRequired,
        collapsed: PropTypes.bool.isRequired,
        allowRepliesShown: PropTypes.bool,
        onExpandCollapse: PropTypes.func,
        onReply: PropTypes.func,
    };

    static defaultProps = {
        allowRepliesShown: true,
        onExpandCollapse: () => {},
        onReply: () => {},
    };

    onClickReply = () => {
        const { userId, userName, onReply, parentId } = this.props;
        onReply({ userId, userName, commentId: parentId });
    };

    render() {
        const {
            intl,
            avatarUrl,
            userName,
            content,
            createdTime,
            replyNumber,
            collapsed,
            allowRepliesShown,
            onExpandCollapse,
        } = this.props;

        const showText = intl.formatMessage(messages.showButton);
        const collapseText = intl.formatMessage(messages.collapseButton);
        const remainingTime = getRemainingTime(createdTime);
        let timeAgoText = '';
        if (remainingTime.years) {
            timeAgoText = intl.formatMessage(commonmessages.years_ago, {
                years: Math.abs(remainingTime.years),
            });
        } else if (remainingTime.months) {
            timeAgoText = intl.formatMessage(commonmessages.months_ago, {
                months: Math.abs(remainingTime.months),
            });
        } else if (remainingTime.days) {
            timeAgoText = intl.formatMessage(commonmessages.days_ago, {
                days: Math.abs(remainingTime.days),
            });
        } else if (remainingTime.hours) {
            timeAgoText = intl.formatMessage(commonmessages.hours_ago, {
                hours: Math.abs(remainingTime.hours),
            });
        } else if (remainingTime.minutes) {
            timeAgoText = intl.formatMessage(commonmessages.minutes_ago, {
                minutes: Math.abs(remainingTime.minutes),
            });
        } else {
            timeAgoText = intl.formatMessage(commonmessages.few_seconds_ago);
        }

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Avatar className={styles.avatar} src={avatarUrl} size="small" />
                    <strong>{userName}</strong>
                </div>

                <div className={styles.content}>{content}</div>
                <div className={styles.footer}>
                    <span>
                        <a tabIndex="0" role="button" onClick={this.onClickReply}>
                            {intl.formatMessage(messages.replyButton)}
                        </a>
                    </span>
                    {allowRepliesShown && replyNumber > 0 ? (
                        <span>
                            <a tabIndex="0" role="button" onClick={onExpandCollapse}>
                                {collapsed ? showText : collapseText}
                            </a>
                        </span>
                    ) : null}
                    <span>{timeAgoText}</span>
                </div>
            </div>
        );
    }
}

export default injectIntl(CommentView);
