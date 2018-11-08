import React, { PureComponent } from 'react';
import { Input, Button } from 'antd';
import { injectIntl, defineMessages } from 'react-intl';
import { PropTypes } from 'prop-types';
import styles from './CommentBox.less';

const { TextArea } = Input;

const messages = defineMessages({
    sendCommentButton: {
        id: 'CommentBox.button.send',
        defaultMessage: 'Send',
    },
});

class CommentBox extends PureComponent {
    render() {
        const { intl, className, show } = this.props;
        if (show) {
            return (
                <div className={className}>
                    <TextArea className={styles.editor} rows={4} />
                    <div className={styles.actionbar}>
                        <Button>{intl.formatMessage(messages.sendCommentButton)}</Button>
                    </div>
                </div>
            );
        }

        return null;
    }
}

const defaultProps = {
    show: true,
};
CommentBox.defaultProps = defaultProps;

const propTypes = {
    show: PropTypes.bool,
};
CommentBox.propTypes = propTypes;

export default injectIntl(CommentBox);
