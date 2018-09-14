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
    message,
    Avatar,
    InputNumber,
    Slider,
    Tabs,
    Input,
    Spin,
} from 'antd';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import styles from './Exchange.less';

library.add(faPaperPlane, faExchangeAlt);
const exchangeicon = <FontAwesomeIcon icon="exchange-alt" />;
const transfericon = <FontAwesomeIcon icon="paper-plane" />;
const { Content, Header, Sider } = Layout;
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
const exchangedropdown = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">
            <Icon type="safety-certificate" />
            GEX - GreenX
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="safety-certificate" />
            PR1 - Project1
        </Menu.Item>
        <Menu.Item key="3">
            <Icon type="safety-certificate" />
            PR2 - Project2
        </Menu.Item>
    </Menu>
);
const { TabPane } = Tabs;

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}
function onChange(value) {
    console.log('changed', value);
}
function onAfterChange(value) {
    console.log('onAfterChange: ', value);
}

class Exchange extends Component {
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
    }

    render() {
        const { loading, exchange } = this.props;

        const isGasLoading =
            (loading.effects['exchange/fetchGas'] === undefined
                ? true
                : loading.effects['exchange/fetchGas']) || false;

        if (isGasLoading) {
            return <Spin size="large" />;
        }

        const dropdowncurrencies = (
            <Dropdown placement="bottomCenter" overlay={exchangedropdown}>
                <Button className={styles.transferamount} style={{ marginLeft: 8 }}>
                    <span> GEX - GreenX</span> <Icon type="down" />
                </Button>
            </Dropdown>
        );
        const balance = (
            <>
                <h3 className={styles.balancetitle}> Your Balance</h3>
                <Card>
                    <Row>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance, styles.balancespan)}>
                                <span>
                                    GEX Balance
                                    <br />
                                    500,000
                                </span>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance)}>
                                <span>
                                    PR01 Balance
                                    <br />
                                    300,000
                                </span>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance, styles.balancespan)}>
                                <span>
                                    PR02 Balance
                                    <br />
                                    50,000
                                </span>
                            </div>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                            <div className={classNames(styles.balance)}>
                                <span>
                                    PR03 Balance
                                    <br />
                                    510,000
                                </span>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </>
        );
        const history = (
            <>
                <Card>
                    <Row type="flex" justify="center" align="center">
                        <strong>Max price: {exchange.gasprice.price.max}</strong>
                    </Row>
                    <Row style={{ marginTop: 20 }} type="flex" justify="center" align="center">
                        <Button className={styles.btnexchange} type="primary" size="large">
                            Exchange
                        </Button>
                    </Row>
                </Card>
            </>
        );
        const exchangeleftcol = (
            <Card>
                <Row type="flex" justify="center" align="center">
                    <Col xs={6} sm={3} md={3} lg={3} xl={3} span={3}>
                        <Avatar src={gexlogo} />
                    </Col>
                    <Col>
                        <div>{dropdowncurrencies}</div>
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
                            defaultValue={1000000}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={onChange}
                            step={0.1}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Slider
                        marks={marks}
                        defaultValue={30}
                        onChange={onChange}
                        onAfterChange={onAfterChange}
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
                        <div>{dropdowncurrencies}</div>
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
                            defaultValue={1000000}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            onChange={onChange}
                            step={0.1}
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }}>
                    <Slider
                        marks={marks}
                        defaultValue={30}
                        onChange={onChange}
                        onAfterChange={onAfterChange}
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
                                    <div>{dropdowncurrencies}</div>
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
                                        defaultValue={1000000}
                                        formatter={value =>
                                            `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                        }
                                        parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                        onChange={onChange}
                                        step={0.1}
                                    />
                                </Col>
                            </Row>
                            <Row style={{ marginTop: 20 }}>
                                <Slider
                                    marks={marks}
                                    defaultValue={30}
                                    onChange={onChange}
                                    onAfterChange={onAfterChange}
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
            <div>
                <Layout>
                    <Sider>This is Sider</Sider>
                    <Layout>
                        <Header className={styles.header}>
                            <span>Exchange Header Content</span>
                        </Header>
                        <Content className={styles.container}>
                            <Row>{balance}</Row>
                            <Row style={{ marginTop: 20 }} type="flex">
                                <Col md={24}>
                                    <Tabs type="card" defaultActiveKey="1">
                                        <TabPane tab={<span>{exchangeicon} Exchange</span>} key="1">
                                            <Row type="flex" gutter={30}>
                                                <Col
                                                    className={classNames(
                                                        'gutter-row',
                                                        styles.padbottom
                                                    )}
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
                                                    className={classNames(
                                                        'gutter-row',
                                                        styles.padbottom
                                                    )}
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
                                            <Row>{history}</Row>
                                        </TabPane>
                                        <TabPane tab={<span>{transfericon} Transfer</span>} key="2">
                                            {transfercol}
                                        </TabPane>
                                    </Tabs>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
const mapStateToProps = ({ exchange, loading }) => ({
    exchange,
    loading,
});
export default injectIntl(connect(mapStateToProps)(Exchange), { withRef: true });
