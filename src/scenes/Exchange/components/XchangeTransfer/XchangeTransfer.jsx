import React, { Component } from 'react';
import {
    Layout,
    Row,
    Col,
    Card,
    Menu,
    Dropdown,
    Button,
    Icon,
    Avatar,
    InputNumber,
    Slider,
    Tabs,
    Input,
    Spin,
    Breadcrumb,
} from 'antd';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import styles from './XchangeTransfer.less';

library.add(faPaperPlane, faExchangeAlt);
const exchangeicon = <FontAwesomeIcon icon="exchange-alt" />;
const transfericon = <FontAwesomeIcon icon="paper-plane" />;
const { Content, Header } = Layout;
const marks = {
    0: '0%',
    25: '25%',
    50: {
        style: {
            color: '#86af49',
        },
        label: <strong>50%</strong>,
    },
    75: '75%',
    100: {
        style: {
            color: '#86af49',
        },
        label: <strong>100%</strong>,
    },
};
const gexlogo = 'https://icobench.com/images/icos/icons/greenx.jpg';
const { TabPane } = Tabs;
const TABS_ROW_ID = 'ExchangeTransfer';

function createDropdownList(currencies) {
    // console.log(JSON.stringify({currencies}));
    if (currencies === undefined) {
        return;
    }
    const renderedvalue = Object.keys(currencies).map(key => (
        <Menu.Item key={key}>
            <Icon type="safety-certificate" />
            {currencies[key].symbol} | {currencies[key].name}
        </Menu.Item>
    ));
    return renderedvalue;
}

const TABS = ['exchange', 'transfer'];
const DEFAULT_ACTIVE_TAB = 'exchange';
class XchangeTransfer extends Component {
    state = {
        balanceamount: 0,
        balancetoamount: 0,
        balancetransferamount: 0,
        balancemax: 0,
        balancetomax: 0,
        balancetransfermax: 0,
        slidertovalue: 30,
        sliderfromvalue: 30,
        slidertransfervalue: 30,
        dropdownfromtext: 'Select From',
        dropdowntotext: 'Select To',
        dropdowntransfertext: 'Select To Transfer',
    };

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch({
            type: 'exchange/fetchPairs',
        });
        dispatch({
            type: 'exchange/fetchGas',
        });
        dispatch({
            type: 'exchange/fetchCurrencies',
        });
        dispatch({
            type: 'exchange/fetchBalances',
        });

        this.scroll();
    }

    scroll = () => {
        const { location } = this.props;
        const { hash } = location;

        if (hash && hash.startsWith('#')) {
            const id = hash.slice(1, hash.length);
            const element = document.querySelector(id);
            const alignToTop = true;
            if (element && element.scrollIntoView) {
                setTimeout(() => {
                    element.scrollIntoView(alignToTop);
                }, 0);
            } else if (TABS.includes(id)) {
                const tabElement = document.querySelector(`#${TABS_ROW_ID}`);
                if (tabElement && tabElement.scrollIntoView) {
                    setTimeout(() => {
                        tabElement.scrollIntoView(alignToTop);
                    }, 0);
                }
            }
        }
    };

    getActiveTabFromUrl = () => {
        const { location } = this.props;
        const { hash } = location;

        if (hash && hash.startsWith('#')) {
            const id = hash.slice(1, hash.length);
            if (TABS.includes(id)) {
                return id;
            }
        }
        return DEFAULT_ACTIVE_TAB;
    };

    onSliderChange = value => {
        // console.log('onAfterChange: ', value);
        const { balancemax } = this.state;
        this.setState({
            balanceamount: (balancemax * value) / 100,
        });
        this.setState({
            sliderfromvalue: value,
        });
    };

    onSliderToChange = value => {
        // console.log('onAfterChange: ', value);
        const { balancetomax } = this.state;
        this.setState({
            balancetoamount: (balancetomax * value) / 100,
        });
        this.setState({
            slidertovalue: value,
        });
    };

    onSliderTransferChange = value => {
        // console.log('onAfterChange: ', value);
        const { balancetransfermax } = this.state;
        this.setState({
            balancetransferamount: (balancetransfermax * value) / 100,
        });
        this.setState({
            slidertransfervalue: value,
        });
    };

    onAfterChange = value => {
        // console.log('onAfterChange: ', value);
        this.setState({
            balanceamount: value,
        });
    };

    onSliderAmountAfterChange = value => {
        // console.log('onAfterChange: ', value);
        const { balancemax } = this.state;
        this.setState({
            balanceamount: (balancemax * value) / 100,
        });
        this.setState({
            sliderfromvalue: value,
        });
    };

    onSliderAmountToAfterChange = value => {
        // console.log('onAfterChange: ', value);
        const { balancetomax } = this.state;
        this.setState({
            balancetoamount: (balancetomax * value) / 100,
        });
        this.setState({
            slidertovalue: value,
        });
    };

    onSliderAmountTransferAfterChange = value => {
        // console.log('onAfterChange: ', value);
        const { balancetransfermax } = this.state;
        this.setState({
            balancetransferamount: (balancetransfermax * value) / 100,
        });
        this.setState({
            slidertransfervalue: value,
        });
    };

    onAmountChange = value => {
        // console.log('changed', value);
        this.setState({
            balanceamount: value,
        });
    };

    onAmountToChange = value => {
        // console.log('changed', value);
        this.setState({
            balancetoamount: value,
        });
    };

    onAmountTransferChange = value => {
        // console.log('changed', value);
        this.setState({
            balancetransferamount: value,
        });
    };

    // Set amount and amount to value on dropdown select
    onDropdownClick = ({ key }) => {
        const { exchange } = this.props;
        this.setState({
            balancemax: exchange.balances[key].amount,
        });
        this.setState({
            balanceamount: exchange.balances[key].amount,
        });
        this.setState({
            sliderfromvalue: 100,
        });
        this.setState({
            dropdownfromtext: `${exchange.currencies[key].symbol} | ${
                exchange.currencies[key].name
            }`,
        });
    };

    onDropdownToClick = ({ key }) => {
        const { exchange } = this.props;
        this.setState({
            balancetomax: exchange.balances[key].amount,
        });
        this.setState({
            balancetoamount: exchange.balances[key].amount,
        });
        this.setState({
            slidertovalue: 100,
        });
        this.setState({
            dropdowntotext: `${exchange.currencies[key].symbol} | ${exchange.currencies[key].name}`,
        });
    };

    onDropdownTransferClick = ({ key }) => {
        const { exchange } = this.props;
        this.setState({
            balancetransfermax: exchange.balances[key].amount,
        });
        this.setState({
            balancetransferamount: exchange.balances[key].amount,
        });
        this.setState({
            slidertovalue: 100,
        });
        this.setState({
            dropdowntransfertext: `${exchange.currencies[key].symbol} | ${
                exchange.currencies[key].name
            }`,
        });
    };

    onTabChange = activeKey => {
        const { history, location } = this.props;
        history.replace(`${location.pathname}#${activeKey}`);
    };

    render() {
        const { loading, exchange } = this.props;
        const {
            balanceamount,
            balancetoamount,
            balancetransferamount,
            slidertovalue,
            sliderfromvalue,
            slidertransfervalue,
            dropdowntransfertext,
            dropdowntotext,
            dropdownfromtext,
        } = this.state;

        const activeTab = this.getActiveTabFromUrl();

        // Define dropdown values
        const exchangedropdownto = (
            <Menu defaultSelectedKeys="gex" onClick={this.onDropdownToClick}>
                {createDropdownList(exchange.currencies)}
            </Menu>
        );

        const exchangedropdown = (
            <Menu defaultSelectedKeys="gex" onClick={this.onDropdownClick}>
                {createDropdownList(exchange.currencies)}
            </Menu>
        );

        const exchangedropdowntransfer = (
            <Menu defaultSelectedKeys="gex" onClick={this.onDropdownTransferClick}>
                {createDropdownList(exchange.currencies)}
            </Menu>
        );

        // check if models are loading
        const isGasLoading =
            (loading.effects['exchange/fetchGas'] === undefined
                ? true
                : loading.effects['exchange/fetchGas']) || false;

        const isBalancesLoading =
            (loading.effects['exchange/fetchBalances'] === undefined
                ? true
                : loading.effects['exchange/fetchBalances']) || false;

        const isCurrenciesLoading =
            (loading.effects['exchange/fetchCurrencies'] === undefined
                ? true
                : loading.effects['exchange/fetchCurrencies']) || false;

        // check if balances and currencies is loading
        const isBalancesAndCurrenciesLoading = isBalancesLoading || isCurrenciesLoading;

        // get all currencies and display in dropdown
        const dropdowncurrenciestransfer = (
            <Dropdown placement="bottomCenter" overlay={exchangedropdowntransfer}>
                <Button className={styles.transferamount} style={{ marginLeft: 8 }}>
                    <span>{dropdowntransfertext}</span> <Icon type="down" />
                </Button>
            </Dropdown>
        );
        const dropdowncurrencies = (
            <Dropdown placement="bottomCenter" overlay={exchangedropdown}>
                <Button className={styles.transferamount} style={{ marginLeft: 8 }}>
                    <span>{dropdownfromtext}</span> <Icon type="down" />
                </Button>
            </Dropdown>
        );
        const dropdowncurrenciesto = (
            <Dropdown placement="bottomCenter" overlay={exchangedropdownto}>
                <Button className={styles.transferamount} style={{ marginLeft: 8 }}>
                    <span>{dropdowntotext}</span> <Icon type="down" />
                </Button>
            </Dropdown>
        );

        // Balance section
        const balance = (
            <>
                <h3 className={styles.balancetitle}> Your Balance</h3>
                <Card>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance, styles.balancespan)}>
                                {isBalancesAndCurrenciesLoading ? (
                                    <Spin size="small" tip="Loading..." />
                                ) : (
                                    <span>
                                        {exchange.currencies.gex.symbol} |{' '}
                                        {exchange.currencies.gex.name}
                                        <br />
                                        {Intl.NumberFormat().format(
                                            exchange.balances.gex.amount.toFixed(3)
                                        )}{' '}
                                        <strong>{exchange.currencies.gex.symbol}</strong>
                                    </span>
                                )}
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance)}>
                                {isBalancesAndCurrenciesLoading ? (
                                    <Spin size="small" tip="Loading..." />
                                ) : (
                                    <span>
                                        {exchange.currencies.pr1.symbol} |{' '}
                                        {exchange.currencies.pr1.name}
                                        <br />
                                        {Intl.NumberFormat().format(
                                            exchange.balances.pr1.amount.toFixed(3)
                                        )}{' '}
                                        <strong>{exchange.currencies.pr1.symbol}</strong>
                                    </span>
                                )}
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance, styles.balancespan)}>
                                {isBalancesAndCurrenciesLoading ? (
                                    <Spin size="small" tip="Loading..." />
                                ) : (
                                    <span>
                                        {exchange.currencies.pr2.symbol} |{' '}
                                        {exchange.currencies.pr2.name}
                                        <br />
                                        {Intl.NumberFormat().format(
                                            exchange.balances.pr2.amount.toFixed(3)
                                        )}{' '}
                                        <strong>{exchange.currencies.pr2.symbol}</strong>
                                    </span>
                                )}
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance)}>
                                {isBalancesAndCurrenciesLoading ? (
                                    <Spin size="small" tip="Loading..." />
                                ) : (
                                    <span>
                                        {exchange.currencies.pr3.symbol} |{' '}
                                        {exchange.currencies.pr3.name}
                                        <br />
                                        {Intl.NumberFormat().format(
                                            exchange.balances.pr3.amount.toFixed(3)
                                        )}{' '}
                                        <strong>{exchange.currencies.pr3.symbol}</strong>
                                    </span>
                                )}
                            </div>
                        </Col>
                    </Row>
                </Card>
            </>
        );

        // History section
        const history = (
            <>
                <Card>
                    <Row type="flex" justify="center" align="center">
                        Max price:{' '}
                        {isGasLoading ? (
                            <Spin size="small" tip="Loading..." />
                        ) : (
                            <strong>{exchange.gasprice.price.max}</strong>
                        )}
                    </Row>
                    <Row style={{ marginTop: 20 }} type="flex" justify="center" align="center">
                        <Button className={styles.btnexchange} type="primary" size="large">
                            Exchange
                        </Button>
                    </Row>
                </Card>
            </>
        );

        // Exchange section (tabview)
        const exchangeleftcol = (
            <Card>
                <Row type="flex" justify="center" align="center">
                    <Col xs={6} sm={3} md={3} lg={3} xl={3} span={3}>
                        <Avatar src={gexlogo} />
                    </Col>
                    <Col>
                        {isBalancesAndCurrenciesLoading ? (
                            <Spin size="small" tip="Loading..." />
                        ) : (
                            <div>{dropdowncurrencies}</div>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginTop: 8 }} type="flex" justify="center" align="center">
                    <Col xs={6} sm={3} md={3} lg={3} xl={3} span={3}>
                        Amount:
                    </Col>
                    <Col>
                        <InputNumber
                            className={styles.transferamount}
                            min={0}
                            max={999999999}
                            value={balanceamount.toFixed(3)}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={this.onAmountChange}
                            step={0.1}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Slider
                        marks={marks}
                        value={sliderfromvalue}
                        onChange={this.onSliderChange}
                        onAfterChange={this.onSliderAmountAfterChange}
                    />
                </Row>
            </Card>
        );
        const exchangerightcol = (
            <Card>
                <Row type="flex" justify="center" align="center">
                    <Col xs={6} sm={3} md={3} lg={3} xl={3} span={3}>
                        <Avatar src={gexlogo} />
                    </Col>
                    <Col>
                        {isCurrenciesLoading ? (
                            <Spin size="small" tip="Loading..." />
                        ) : (
                            <div>{dropdowncurrenciesto}</div>
                        )}
                    </Col>
                </Row>
                <Row style={{ marginTop: 8 }} type="flex" justify="center" align="center">
                    <Col xs={6} sm={3} md={3} lg={3} xl={3} span={3}>
                        Amount:
                    </Col>
                    <Col>
                        <InputNumber
                            className={styles.transferamount}
                            min={0}
                            max={999999999}
                            value={balancetoamount.toFixed(3)}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={this.onAmountToChange}
                            step={0.1}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Slider
                        marks={marks}
                        value={slidertovalue}
                        onChange={this.onSliderToChange}
                        onAfterChange={this.onSliderAmountToAfterChange}
                    />
                </Row>
            </Card>
        );
        const transfercol = (
            <>
                <Card>
                    <Row gutter={30}>
                        <Col xs={24} sm={24} md={14} span={14}>
                            <strong>Receiving Address</strong>
                            <Row style={{ marginTop: 20 }}>
                                <Input
                                    placeholder="Enter Receiving Address"
                                    prefix={
                                        <Icon
                                            type="file-text"
                                            style={{ color: 'rgba(0,0,0,0.5)' }}
                                        />
                                    }
                                />
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} md={10} span={10}>
                            <strong>From</strong>
                            <Row style={{ marginTop: 20 }} type="flex" justify="left" align="left">
                                <Col xs={8} span={3}>
                                    <Avatar src={gexlogo} />
                                </Col>
                                <Col xs={16} span={21}>
                                    {isCurrenciesLoading ? (
                                        <Spin size="small" tip="Loading..." />
                                    ) : (
                                        <div>{dropdowncurrenciestransfer}</div>
                                    )}
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }} type="flex" justify="left" align="left">
                                <Col xs={8} span={3}>
                                    Amount:
                                </Col>
                                <Col xs={16} span={21}>
                                    <InputNumber
                                        className={styles.transferamount}
                                        min={0}
                                        max={999999999}
                                        value={balancetransferamount.toFixed(3)}
                                        formatter={value =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        }
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={this.onAmountTransferChange}
                                        step={0.1}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Slider
                                    marks={marks}
                                    value={slidertransfervalue}
                                    onChange={this.onSliderTransferChange}
                                    onAfterChange={this.onSliderAmountTransferAfterChange}
                                />
                            </Row>
                        </Col>
                    </Row>
                </Card>
                <Card style={{ marginTop: 20 }}>
                    <Row type="flex" justify="center" align="center">
                        <strong>TRANSACTION FEE : 0.0003276 ETH</strong>
                    </Row>
                    <Row style={{ marginTop: 20 }} type="flex" justify="center" align="center">
                        <Button className={styles.btnexchange} type="primary" size="large">
                            Send
                        </Button>
                    </Row>
                </Card>
            </>
        );
        return (
            <Layout>
                <Header className={styles.header}>
                    <Breadcrumb style={{ marginTop: 20 }}>
                        <Breadcrumb.Item href="">
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            <Icon type="swap" />
                            <span>Exchange</span>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content className={styles.container}>
                    <Row>{balance}</Row>
                    <Row id={TABS_ROW_ID} style={{ marginTop: 20 }} type="flex">
                        <Col md={24}>
                            <Tabs type="card" activeKey={activeTab} onChange={this.onTabChange}>
                                <TabPane tab={<span>{exchangeicon} Exchange</span>} key="exchange">
                                    <Row type="flex" gutter={30}>
                                        <Col
                                            className={classNames('gutter-row', styles.padbottom)}
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                            span={12}
                                        >
                                            {exchangeleftcol}
                                        </Col>
                                        <Col
                                            className={classNames('gutter-row', styles.padbottom)}
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={12}
                                            xl={12}
                                            span={12}
                                        >
                                            {exchangerightcol}
                                        </Col>
                                    </Row>
                                    <Row>{isGasLoading ? <Spin size="large" /> : history}</Row>
                                </TabPane>
                                <TabPane tab={<span>{transfericon} Transfer</span>} key="transfer">
                                    {transfercol}
                                </TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        );
    }
}
const mapStateToProps = ({ exchange, loading }) => ({
    exchange,
    loading,
});
export default injectIntl(connect(mapStateToProps)(XchangeTransfer), { withRef: true });
