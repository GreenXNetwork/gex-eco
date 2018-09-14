import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Layout, Select, Card, Spin, Table, Menu, Row, Col } from 'antd';
import { injectIntl, defineMessages } from 'react-intl';
import { connect } from 'dva';
import classNames from 'classnames';
import SimplePie from '../../components/Charts/SimplePie';
import { getMessage } from '../../common/definedmessages';
import styles from './Portfolio.less';

const { Option } = Select;
const { Content, Header } = Layout;

const messages = defineMessages({
    portfolio_currency: {
        id: 'Portfolio.currency',
        defaultMessage: 'Portfolio Currency',
    },
    overview: {
        id: 'Portfolio.overview',
        defaultMessage: 'OVERVIEW',
    },
    chart_title: {
        id: 'Portfolio.chart_title',
        defaultMessage: 'BREAKDOWN OF THE PIE PORTFOLIO',
    },
});

const columns = [
    {
        title: 'Project & Campaign',
        dataIndex: 'project_campaign',
        width: 300,
    },
    {
        title: 'Average Bying Price',
        dataIndex: 'avg_buying_price',
        width: 150,
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        width: 150,
    },
    {
        title: 'Total Value',
        dataIndex: 'total',
        width: 150,
    },
    {
        title: 'Profit/Loss',
        dataIndex: 'profit_loss',
        width: 150,
    },
    {
        title: 'Change',
        dataIndex: 'change',
        width: 80,
    },
];

function getSummaryPieData(summary) {
    const pieData = Object.keys(summary).map(key => {
        return {
            x: key,
            y: summary[key],
        };
    });
    return pieData;
}

class Portfolio extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'portfolio/fetch',
        });
    }

    handleCurrencyChange = value => {
        const { dispatch } = this.props;
        dispatch({
            type: 'portfolio/fetchDetails',
            currency: value,
        });
    };

    render() {
        const { intl, loading, portfolio } = this.props;

        const isPageLoading =
            (loading.effects['portfolio/fetch'] === undefined
                ? true
                : loading.effects['portfolio/fetch']) || false;

        if (isPageLoading) {
            return <Spin size="large" />;
        }

        const isSummaryLoading = loading.effects['portfolio/fetchSummary'] || false;

        const isDetailsLoading = loading.effects['portfolio/fetchDetails'] || false;

        const currentCurrency = portfolio.currency.current;
        const currencyList = portfolio.currency.list;
        const selectCurrency = (
            <Select
                defaultValue={currentCurrency}
                style={{ width: 120 }}
                onChange={this.handleChange}
            >
                {currencyList.map(item => (
                    <Option value={item}>{item}</Option>
                ))}
            </Select>
        );

        const overview = (
            <Card
                bordered={false}
                title={intl.formatMessage(messages.overview)}
                headStyle={{ color: '#12312' }}
                className={styles.overview}
            >
                <Menu style={{ borderRight: 'none' }} defaultSelectedKeys={['portfolio-min']}>
                    {portfolio.sorts.map(item => (
                        <Menu.Item key={item[0]}>
                            <div className="clearfix">
                                <span className="right">
                                    {intl.formatMessage(getMessage(item[0]))}
                                </span>
                                <span className="left">
                                    {intl.formatMessage(getMessage(item[1]))}
                                </span>
                            </div>
                        </Menu.Item>
                    ))}
                </Menu>
            </Card>
        );

        const pieDate = getSummaryPieData(portfolio.summary);
        const chart = (
            <Card
                bordered={false}
                title={intl.formatMessage(messages.chart_title)}
                loading={isSummaryLoading}
                className="main-title-text-color"
            >
                <SimplePie
                    hasLegend
                    data={pieDate}
                    height={248}
                    lineWidth={4}
                    inner={0.4}
                />
            </Card>
        );

        const details = (
            <Table
                loading={isDetailsLoading}
                columns={columns}
                dataSource={portfolio.details}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
            />
        );

        return (
            <div>
                <Header className={styles.header}>
                    <div>
                        {intl.formatMessage(messages.portfolio_currency)} {selectCurrency}
                    </div>
                </Header>
                <Content className={styles.container} style={{ height: '100%' }}>
                    <Row type="flex" gutter={32}>
                        <Col
                            className={classNames('gutter-row', styles.padbottom)}
                            xs={24}
                            sm={24}
                            md={24}
                            lg={12}
                            xl={12}
                            span={12}
                        >
                            {overview}
                        </Col>
                        <Col
                            className={classNames('gutter-row', styles.padbottom)}
                            xs={24}
                            sm={24}
                            md={24}
                            lg={12}
                            xl={12}
                            span={12}
                        >
                            {chart}
                        </Col>
                    </Row>
                    <Row>{details}</Row>
                </Content>
            </div>
        );
    }
}

const propTypes = {
    intl: PropTypes.any.isRequired,
    loading: PropTypes.any.isRequired,
};

Portfolio.propTypes = propTypes;

const mapStateToProps = ({ portfolio, loading }) => ({
    portfolio: portfolio.current,
    loading,
});

export default injectIntl(connect(mapStateToProps)(Portfolio), { withRef: true });
