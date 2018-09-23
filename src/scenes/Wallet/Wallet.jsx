import React, { Component } from 'react';
import { Button, Layout, Card, Col, Row, message } from 'antd';
// http://react-component.github.io/queue-anim/examples/enter-leave.html
import QueueAnim from 'rc-queue-anim';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import Web3 from 'web3';
import Metamask from './components/Metamask';
import Trezor from './components/Trezor';
import Ledger from './components/Ledger';
import Keystore from './components/Keystore';
import Privatekey from './components/Privatekey';
import styles from './Wallet.less';

const { Content } = Layout;
const web3 = new Web3('wss://ropsten.infura.io/ws');

/* const messages = defineMessages({
    metamask: {
        id: 'Wallet.metamask',
        defaultMessage: 'Metamask',
    },
    error_not_connect: {
        id: 'Wallet.error_not_connect',
        defaultMessage: 'Error! Wallet not connected',
    },
}); */

const { Meta } = Card;

const wallets = [
    {
        key: 0,
        name: 'Metamask',
        image: 'https://pbs.twimg.com/profile_images/632786773366599681/VzI4uiQB.png',
    },
    {
        key: 1,
        name: 'TREZOR',
        image: 'https://i.pinimg.com/originals/5f/a1/a0/5fa1a0ba6f96cb835563a97cdd35e1e9.png',
    },
    {
        key: 2,
        name: 'Ledger',
        image: 'https://pbs.twimg.com/profile_images/915545754084741120/N44_mYZ7_400x400.jpg',
    },
    {
        key: 3,
        name: 'Keystore',
        image:
            'https://cdn.iconscout.com/public/images/icon/premium/png-512/file-format-document-json-extension-programming-coding-31f7f33d4f1e25ac-512x512.png',
    },
    {
        key: 4,
        name: 'Private Key',
        image:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUgQlArgloQfnAi71kTavbXCN1hx7PmT3TVNSFdfxSayR-YoeQ',
    },
];

class Wallet extends Component {
    setCards = () => {
        const cards = [];
        const { wallet } = this.props;

        for (let i = 0; i < wallets.length; i += 1) {
            cards.push(
                <Col span={4} key={wallets[i].key}>
                    <Card
                        hoverable
                        onClick={e => {
                            this.onClick(e, wallets[i]);
                        }}
                        className={wallets[i].key === wallet ? styles.cardSelected : styles.card}
                        cover={<img alt="example" src={wallets[i].image} />}
                    >
                        <Meta title={wallets[i].name} />
                    </Card>
                </Col>
            );
        }
        return cards;
    };

    onClick = (e, wallet) => {
        const { dispatch } = this.props;

        dispatch({
            type: 'wallet/selectWallet',
            current: wallet.key,
        });
        // clear account state
        dispatch({
            type: 'wallet/setAccount',
            account: '',
        });
    };

    // these fields are shown when account info is in store
    // used with Keystore & Privatekey method, where we get inputs from user and send transaction manually
    TransferButton = () => {
        return (
            <Button type="danger" onClick={this.transfer}>
                Test Transaction
            </Button>
        );
    };

    transfer = () => {
        const { account } = this.props;
        // test a transaction
        account
            .signTransaction({
                to: '0xF0109fC8DF283027b6285cc889F5aA624EaC1F55',
                value: '1000000000',
                gas: 2000000,
            })
            .then(result => {
                return web3.eth.sendSignedTransaction(result.rawTransaction);
            })
            .catch(error => {
                message.error(error.toString());
            });
    };

    showWallet = (wallet, dispatch) => {
        switch (wallet) {
        case 0:
            return <Metamask key="1" show wallet={wallet} />;
        case 1:
            return <Trezor key="2" show wallet={wallet} />;
        case 2:
            return <Ledger key="3" show wallet={wallet} />;
        case 3:
            return <Keystore key="4" show wallet={wallet} dispatch={dispatch} />;
        case 4:
            return <Privatekey key="5" show wallet={wallet} dispatch={dispatch} />;
        default:
            return <div key="6" />;
        }
    };

    render() {
        const { wallet, account, dispatch } = this.props;
        return (
            <Layout>
                <Row>
                    <Content style={{ background: '#ECECEC', padding: '30px' }}>
                        <Row gutter={16} type="flex" justify="center">
                            {this.setCards()}
                        </Row>
                    </Content>
                </Row>
                <Row>
                    <Content style={{ padding: '30px' }}>
                        <Col span={8} offset={2}>
                            <QueueAnim
                                type={['right', 'left']}
                                interval={[100, 0]}
                                delay={[200, 0]}
                                duration={[800, 200]}
                                ease={['easeOutCubic', 'easeInBack']}
                                leaveReverse
                            >
                                {this.showWallet(wallet, dispatch)}
                                {account ? (
                                    <this.TransferButton key="100" account={account} />
                                ) : null}
                            </QueueAnim>
                        </Col>
                    </Content>
                </Row>
            </Layout>
        );
    }
}

const mapStateToProps = ({ wallet, loading }) => ({
    wallet: wallet.current,
    account: wallet.account,
    loading,
});

export default injectIntl(connect(mapStateToProps)(Wallet), { withRef: true });
