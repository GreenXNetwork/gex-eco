import React, { PureComponent } from 'react';
import styles from './index.less';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class CandyProgress extends PureComponent {
    render() {
        const { value } = this.props;

        let percentage = Math.trunc((value % 1) * 100);
        percentage = percentage + '%';

        return (
            <div className={classNames(styles.candy, styles.green)}>
                <span style={{ width: percentage }} />
            </div>
        );
    }
}

const propTypes = {
    value: PropTypes.number
};
CandyProgress.propTypes = propTypes;

export default CandyProgress;