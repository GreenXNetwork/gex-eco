import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd'; // Select, Card, Spin, Table, Menu,
import classNames from 'classnames';
import styles from './Exchange.less';

const { Content, Header } = Layout;

class Exchange extends Component {
    render() {
        const balance = <center>Balance Constant</center>;
        const history = <center>History Table Const</center>;
        const transferleftcol = <center>Column left column const</center>;
        const transferrightcol = <center>Column right column const</center>;
        return (
            <div>
                <Header className={styles.header}>
                    <span>Exchange Header Content</span>
                </Header>
                <Content className={styles.container} style={{ height: '100%' }}>
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
            </div>
        );
    }
}
export default Exchange;
