import React, { PureComponent } from 'react';
import { Avatar, Spin, Row, Col } from 'antd';
import { defineMessages, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import styles from './AboutMe.less';

library.add(faMapMarkerAlt);

const messages = defineMessages({
    about_me: {
        id: 'AboutMe.about_me',
        defaultMessage: 'About Me',
    },
    campaigns: {
        id: 'AboutMe.campaigns',
        defaultMessage: 'Campaigns',
    },
    comments: {
        id: 'AboutMe.comments',
        defaultMessage: 'Comments',
    },
    contributions: {
        id: 'AboutMe.contributions',
        defaultMessage: 'Contributions',
    },
});

const mapMarkerIcon = <FontAwesomeIcon icon="map-marker-alt" />;

class AboutMe extends PureComponent {
    componentDidMount() {
        const { dispatch, userId, intl } = this.props;
        dispatch({
            type: 'profiletrans/fetch',
            userId,
            lang: intl.locale,
        });
    }

    render() {
        const { intl, loading, profiletrans } = this.props;

        const isLoading =
            loading.effects['profiletrans/fetch'] === undefined
                ? true
                : loading.effects['profiletrans/fetch'];

        if (isLoading) {
            return <Spin size="large" />;
        }

        const avatarUrl = profiletrans.avatar_url ? profiletrans.avatar_url : '/default-avatar.png';

        const locationNode = profiletrans.address ? (
            <p>
                {mapMarkerIcon} {profiletrans.address}
            </p>
        ) : (
            <></>
        );

        const titleNode = <p>{profiletrans.headline}</p>;
        const descriptionNode = <p>{profiletrans.description}</p>;

        return (
            <Row className={classNames(styles.aboutMeContainer)} gutter={24}>
                <Col sm={24} md={16} lg={16}>
                    <img alt="" src={avatarUrl} />
                    <div className={styles.title}>{titleNode}</div>
                    <div className={styles.description}>{descriptionNode}</div>
                </Col>
                <Col sm={24} md={8} lg={8}>
                    <Avatar size="large" className={styles.avatar} src={avatarUrl}>
                        {intl.formatMessage(messages.about_me)}
                    </Avatar>
                    <p />
                    {locationNode}
                    <p>
                        {profiletrans.campaigns_number} {intl.formatMessage(messages.campaigns)}
                    </p>
                    <p>
                        {profiletrans.comments_number} {intl.formatMessage(messages.campaigns)}
                    </p>
                    <p>
                        {profiletrans.contributions_number}{' '}
                        {intl.formatMessage(messages.contributions)}
                    </p>
                </Col>
            </Row>
        );
    }
}

const propTypes = {
    intl: PropTypes.any.isRequired,
    userId: PropTypes.number.isRequired,
};
AboutMe.propTypes = propTypes;

const mapStateToProps = ({ loading, profiletrans }) => ({
    loading,
    profiletrans,
});

export default injectIntl(connect(mapStateToProps)(AboutMe), { withRef: true });
