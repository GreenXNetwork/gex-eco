import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, defineMessages } from 'react-intl';
import { Button, Row, Col, Card, Avatar, InputNumber } from 'antd';
import CandyProgress from 'components/CandyProgress';
import classNames from 'classnames';
import commonmessages, { getMessage } from '../../../../common/definedmessages';
import { getRemainingDays } from '../../../../utils/time';
import styles from './DetailView.less';

const { Meta } = Card;

const messages = defineMessages({
    raised_by: {
        id: 'DetailView.raised_by',
        defaultMessage: '{money} {currency} raised by {investornum} investors',
    },
    percentage_of_money: {
        id: 'DetailView.percentage_of_money',
        defaultMessage: '{percentage} of {money}',
    },
    due_deli_report: {
        id: 'DetailView.due_diligence_report.button',
        defaultMessage: 'DUE DILIGENCE REPORT',
    },
    ai_risk_report: {
        id: 'DetailView.ai_risk_report.button',
        defaultMessage: 'AI RISK REPORT',
    },
    contribute: {
        id: 'DetailView.contribute.button',
        defaultMessage: 'MAKE A CONTRIBUTION',
    },
    donation_placeholder: {
        id: 'DetailView.donation.placeholder',
        defaultMessage: 'DONATION GEX AMOUNT',
    },
    project_owner: {
        id: 'DetailView.project_owner',
        defaultMessage: 'Developer',
    },
    owner_more: {
        id: 'DetailView.project_owner.more',
        defaultMessage: 'More',
    },
});

class DetailView extends PureComponent {
    handleOwnerMore = () => {};

    render() {
        const { intl, detail, onOwnerMore } = this.props;
        const { owner } = detail;

        const energyType = getMessage(`headline_${detail.category}`);

        const remainingDays = getRemainingDays(detail.endtime);
        const timeLeft = intl.formatMessage(commonmessages.remaining_days, { days: remainingDays });
        const money = `$${detail.raisedamount}`;
        const percentage = `${(detail.progress * 100).toFixed(2)}%`;
        const completionText = intl.formatMessage(messages.percentage_of_money, {
            percentage,
            money: detail.goal,
        });
        const raisedByText = intl.formatMessage(messages.raised_by, {
            money,
            currency: detail.currency,
            investornum: detail.investors_number,
        });
        const donationText = intl.formatMessage(messages.donation_placeholder);

        return (
            <div>
                <div className={classNames('clearfix', styles.titleContainer)}>
                    <div className={classNames('left', styles.title)}>{detail.name}</div>
                    <div className={classNames('right', styles.energyLabel)}>
                        <p className={styles.content}>{intl.formatMessage(energyType)}</p>
                    </div>
                </div>
                <Card>
                    <Meta
                        description={<p className={styles.introduction}>{detail.description}</p>}
                    />
                    <Meta title={<p>{intl.formatMessage(messages.project_owner)}</p>} />
                    <Meta
                        avatar={<Avatar size={64} src={owner.avatar_url} />}
                        description={
                            <div className={styles.ownerDescription}>
                                <p>{owner.name}</p>
                                <p>{owner.location}</p>
                                <a onClick={onOwnerMore}>
                                    {intl.formatMessage(messages.owner_more)}
                                </a>
                            </div>
                        }
                    />
                </Card>

                <div className={styles.progressContainer}>
                    <div>{raisedByText}</div>
                    <CandyProgress value={detail.progress} />
                    <div className="clearfix">
                        <span className="left">{completionText}</span>
                        <span className="right">{timeLeft}</span>
                    </div>
                </div>

                <Row gutter={16} className={styles.actionContainer}>
                    <Col span={9}>
                        <Button className={styles.cyanBtn} type="primary">
                            {intl.formatMessage({ ...messages.due_deli_report })}
                        </Button>
                    </Col>

                    <Col span={6}>
                        <Button className={styles.darkblueBtn} type="primary">
                            {intl.formatMessage({ ...messages.ai_risk_report })}
                        </Button>
                    </Col>

                    <Col span={9}>
                        <Button className={styles.lightgreenBtn} type="primary">
                            {intl.formatMessage({ ...messages.contribute })}
                        </Button>
                    </Col>
                </Row>

                <div className={styles.contributionContainer}>
                    <InputNumber
                        className={styles.contributionAmount}
                        size="large"
                        placeholder={donationText}
                        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    />
                </div>
            </div>
        );
    }
}

const defaultProps = {
    onOwnerMore: () => {},
};
DetailView.defaultProps = defaultProps;

const propTypes = {
    intl: PropTypes.any.isRequired,
    detail: PropTypes.any.isRequired,
    onOwnerMore: PropTypes.func,
};
DetailView.propTypes = propTypes;

export default injectIntl(DetailView, { withRef: true });
