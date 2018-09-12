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
} from 'antd';
import classNames from 'classnames';
import styles from './Exchange.less';

const { Content, Header, Sider } = Layout;

function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
}
function onChange(value) {
    console.log('changed', value);
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
            <Card>
                <h3 className={styles.balancetitle}> Your Balance</h3>
                <Row>
                    <Col
                        className={classNames(styles.balance, styles.balancespan)}
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        span={6}
                    >
                        <span>
                            GEX Balance
                            <br />
                            500,000
                        </span>
                    </Col>
                    <Col className={styles.balance} xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                        <span>
                            PR01 Balance
                            <br />
                            300,000
                        </span>
                    </Col>
                    <Col
                        className={classNames(styles.balance, styles.balancespan)}
                        xs={12}
                        sm={12}
                        md={6}
                        lg={6}
                        xl={6}
                        span={6}
                    >
                        <span>
                            PR02 Balance
                            <br />
                            50,000
                        </span>
                    </Col>
                    <Col className={styles.balance} xs={12} sm={12} md={6} lg={6} xl={6} span={6}>
                        <span>
                            PR03 Balance
                            <br />
                            510,000
                        </span>
                    </Col>
                </Row>
            </Card>
        );
        const history = (
            <>
                <center>History Table Const</center>
            </>
        );
        const transferleftcol = (
            <>
                <h3 className={styles.transfertitle}>
                    <span>Exchange</span>
                    /Transfer
                </h3>
                <Card>
                    <Row>
                        <Col>
                            <div>
                                <Avatar
                                    className={styles.currenciesicon}
                                    src="https://etherscan.io/token/images/greenx_28.png"
                                    shape="circle"
                                />
                                <Dropdown overlay={exchangedropdown}>
                                    <Button style={{ marginLeft: 8 }}>
                                        <span> GEX - GreenX</span> <Icon type="down" />
                                    </Button>
                                </Dropdown>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            Amount:{' '}
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
                </Card>
            </>
        );
        const transferrightcol = <center>Column right column const</center>;
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
