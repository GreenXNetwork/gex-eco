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
} from 'antd';
import classNames from 'classnames';
import styles from './Exchange.less';

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
    render() {
        const exchangedropdown = (
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="1">
                    <Icon type="safety-certificate" />
                    GEX-GreenX
                </Menu.Item>
                <Menu.Item key="2">
                    <Icon type="safety-certificate" />
                    PR1-Project1
                </Menu.Item>
                <Menu.Item key="3">
                    <Icon type="safety-certificate" />
                    PR2-Project2
                </Menu.Item>
            </Menu>
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
                        <strong>1 GEX = 5 PR01</strong>
                    </Row>
                    <Row style={{ marginTop: 20 }} type="flex" justify="center" align="center">
                        <Button className={styles.btnexchange} type="primary" size="large">
                            Exchange
                        </Button>
                    </Row>
                </Card>
            </>
        );
        const transferleftcol = (
            <>
                <h3 className={styles.transfertitle}>
                    <span>Exchange</span>
                    /Transfer
                </h3>
                <Card>
                    <Row type="flex" justify="center" align="center">
                        <Col xs={6} sm={3} md={3} lg={3} xl={3} span={3}>
                            <Avatar src={gexlogo} />
                        </Col>
                        <Col>
                            <div>
                                <Dropdown overlay={exchangedropdown}>
                                    <Button
                                        className={styles.transferamount}
                                        style={{ marginLeft: 8 }}
                                    >
                                        <span> GEX - GreenX</span> <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
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
                </Card>
            </>
        );
        const transferrightcol = (
            <>
                <h3 className={styles.transfertitle}>
                    <span>Exchange</span>
                    /Transfer
                </h3>
                <Card>
                    <Row type="flex" justify="center" align="center">
                        <Col xs={6} sm={3} md={3} lg={3} xl={3} span={3}>
                            <Avatar src={gexlogo} />
                        </Col>
                        <Col>
                            <div>
                                <Dropdown overlay={exchangedropdown}>
                                    <Button
                                        className={styles.transferamount}
                                        style={{ marginLeft: 8 }}
                                    >
                                        <span> GEX - GreenX</span> <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
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
                            <Row type="flex" gutter={32}>
                                <Col
                                    className={classNames('gutter-row', styles.padbottom)}
                                    xs={24}
                                    sm={24}
                                    md={12}
                                    lg={12}
                                    xl={12}
                                    span={12}
                                >
                                    {transferleftcol}
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
                                    {transferrightcol}
                                </Col>
                            </Row>
                            <Row>{history}</Row>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        );
    }
}
export default Exchange;
