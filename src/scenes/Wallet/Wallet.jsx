import React, { Component } from 'react';
import { Radio, Button, Layout } from 'antd';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';
import Web3 from 'web3';
import Metamask from './components/Metamask';
import Trezor from './components/Trezor';
import Ledger from './components/Ledger';
import Keystore from './components/Keystore';
import Privatekey from './components/Privatekey';
import styles from './Wallet.less';

const { Content, Sider } = Layout;
const web3 = new Web3(Web3.givenProvider || 'wss://ropsten.infura.io/ws');

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
const RadioGroup = Radio.Group;

const wallets = [
    {
        key: 0,
        name: 'Metamask',
    },
    {
        key: 1,
        name: 'TREZOR',
    },
    {
        key: 2,
        name: 'Ledger',
    },
    {
        key: 3,
        name: 'Keystore',
    },
    {
        key: 4,
        name: 'Private Key',
    },
];

class Wallet extends Component {
    addRadios = () => {
        const radios = [];
        for (let i = 0; i < wallets.length; i += 1) {
            radios.push(
                <div key={wallets[i].key}>
                    <Radio value={wallets[i].key}>{wallets[i].name}</Radio>
                    <br />
                </div>
            );
        }
        return radios;
    };

    onChange = e => {
        const { dispatch } = this.props;
        dispatch({
            type: 'wallet/selectWallet',
            current: e.target.value,
        });
        // clear account state
        dispatch({
            type: 'wallet/setAccount',
            account: '',
        });
    };

    // transferButton is shown when account info is in store
    TransferButton = props => {
        // this account type is Web3 1.0, not the `account` from getAccount() of Metamask
        if (props.account) {
            return (
                <Button type="danger" onClick={this.transfer}>
                    Test Transaction
                </Button>
            );
        }
        return null;
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
            .then(result => {
                console.log('__________________');
                console.log(result);
            });
    };

    render() {
        const { wallet, account, dispatch } = this.props;

        return (
            <Layout className={styles.layout}>
                <Sider
                    className={styles.sider}
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <RadioGroup className={styles.radio} onChange={this.onChange} value={wallet}>
                        {this.addRadios()}
                    </RadioGroup>
                </Sider>
                <Layout className={styles.layout}>
                    <Content className={styles.content}>
                        <Metamask wallet={wallet} />
                        <Trezor wallet={wallet} />
                        <Ledger wallet={wallet} />
                        <Keystore wallet={wallet} dispatch={dispatch} />
                        <Privatekey wallet={wallet} dispatch={dispatch} />
                        <this.TransferButton account={account} />
                    </Content>
                </Layout>
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
