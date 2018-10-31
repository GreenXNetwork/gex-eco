import React, { PureComponent } from 'react';
import { Card, Icon } from 'antd';
import { injectIntl } from 'react-intl';
import CandyProgress from 'components/CandyProgress';
import PropTypes from 'prop-types';
import styles from './ProjectCard.less';
import commonmessages, { getMessage } from '../../../../common/definedmessages';
import { getRemainingDays } from '../../../../utils/time';

class ProjectCard extends PureComponent {
    // state = {
    //     id: 0,
    //     type: undefined,
    //     name: undefined,
    //     description: undefined,
    //     category: undefined,
    //     raisedamount: undefined,
    //     progress: 0,
    //     endtime: 0,
    // }

    render() {
        const { project, intl, onClick } = this.props;

        const headline = getMessage(`headline_${project.type}`);
        const category = getMessage(project.category);
        const remainingDays = getRemainingDays(project.endtime);
        const timeLeft = intl.formatMessage(commonmessages.remaining_days, { days: remainingDays });
        const money = `$${project.raisedamount}`;
        const percentage = `${(project.progress * 100).toFixed(2)}%`;

        return (
            <Card
                hoverable
                style={{
                    width: 300,
                    height: 360,
                    display: 'inline-block',
                    boxShadow: '20px 20px 41px -16px rgba(140,140,140,1)',
                }}
                bodyStyle={{ padding: 0 }}
                cover={<img alt={project.name} src={project.thumbnail} onClick={onClick} />}
            >
                <div className={styles.headline}>{intl.formatMessage(headline)}</div>
                <div className={styles.name}>
                    <span>{project.name}</span>
                </div>
                <div className={styles.desc}>{project.description}</div>
                <div className={styles.footerpart}>
                    <div className={styles.footercontent}>
                        <p className={styles.category}>{intl.formatMessage(category)}</p>
                        <div className={styles.progressinfo}>
                            <span className={styles.floattoleft}>{money}</span>
                            <span className={styles.floattoright}>{percentage}</span>
                            <div style={{ clear: 'both' }} />
                        </div>
                        <CandyProgress value={project.progress} />
                        <span>
                            <Icon className={styles.textColor} type="clock-circle-o" /> {timeLeft}
                        </span>
                    </div>
                </div>
            </Card>
        );
    }
}

const propTypes = {
    intl: PropTypes.any.isRequired,
    project: PropTypes.any.isRequired,
    onClick: PropTypes.func.isRequired,
};
ProjectCard.propTypes = propTypes;

export default injectIntl(ProjectCard, { withRef: true });
