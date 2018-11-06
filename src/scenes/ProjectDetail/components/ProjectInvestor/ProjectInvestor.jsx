import React, { PureComponent } from 'react';
import { Avatar } from 'antd';
import PropTypes from 'prop-types';
import styles from './ProjectInvestor.less';

class ProjectInvestor extends PureComponent {
    render() {
        const { avatarUrl, investorName, investTime, investAmount } = this.props;

        return (
            <div className={styles.container}>
                <Avatar className={styles.avatar} src={avatarUrl} />
                <div className={styles.detail}>
                    <p>
                        <strong>{investorName}</strong>
                    </p>
                    <p>{investTime}</p>
                </div>
                <div className={styles.pledge}>
                    <p>{investAmount}</p>
                </div>
            </div>
        );
    }
}

const propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    investorName: PropTypes.string.isRequired,
    investTime: PropTypes.number.isRequired,
    investAmount: PropTypes.any.isRequired,
};

ProjectInvestor.propTypes = propTypes;

export default ProjectInvestor;
