import React, { PureComponent } from 'react';
import { Avatar } from 'antd';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import commonmessages from '../../../../../../common/definedmessages';
import styles from './UpdatePost.less';
import { getRemainingTime } from '../../../../../../utils/time';

class UpdatePost extends PureComponent {
    static defaultProps = {
        collapseHeight: 180,
    };

    static propTypes = {
        data: PropTypes.any.isRequired,
        collapseHeight: PropTypes.number,
    };

    state = {
        truncated: true,
    };

    contentRef = React.createRef();

    componentDidMount() {
        const { truncated } = this.state;
        const { collapseHeight } = this.props;
        if (truncated && this.contentRef.current.offsetHeight < collapseHeight) {
            this.setState({ truncated: false });
        }
    }

    onShowMore = () => {
        this.setState({ truncated: false });
    };

    render() {
        const { truncated } = this.state;
        const { intl, collapseHeight, data } = this.props;

        const {
            avatar_image_url: avatarUrl,
            owner_name: ownerName,
            html: htmlContent,
            created_time: createdTime,
        } = data;

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

        const showMoreNode = truncated ? (
            <a tabIndex="0" role="button" onClick={this.onShowMore}>
                show more
            </a>
        ) : null;

        const truncatedContentClassName = truncated ? styles.truncated : null;
        const truncationEffectClassName = truncated ? styles.truncationfade : null;
        const contentStyle = truncated ? { maxHeight: `${collapseHeight}px` } : null;

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <Avatar className={styles.avatar} src={avatarUrl} />
                    <div className={styles.detail}>
                        <p>
                            <strong>{ownerName}</strong>
                        </p>
                        <p>{timeAgoText}</p>
                    </div>
                </div>

                <div className={styles.truncationContainer}>
                    <div className={truncatedContentClassName} style={contentStyle}>
                        <div
                            className={styles.content}
                            ref={this.contentRef}
                            dangerouslySetInnerHTML={{ __html: htmlContent }}
                        />
                    </div>
                    <div className={truncationEffectClassName} />
                </div>
                <div className={styles.footer}>{showMoreNode}</div>
            </div>
        );
    }
}

export default injectIntl(UpdatePost);
