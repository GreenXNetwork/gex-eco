import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, message } from 'antd';

class Metamask extends Component {
    state = {
        loading: false,
    };

    connect = () => {
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx

        if (!window.web3) {
            message.error(`${wallet.name}is not installed`);
            return false;
        }

        const { web3 } = window;
        if (wallet === 0) {
            // Metamask
            this.setState({
                loading: true,
            });

            web3.eth.getAccounts((err, accounts) => {
                if (err != null) message.error(`An error occurred: ${err}`);
                else if (accounts.length === 0) {
                    message.error('User is not logged in to MetaMask');
                } else {
                    // test transaction
                    web3.eth.sendTransaction(
                        {
                            from: '0x68ab5366ae21400cdbad9c22def43c0df4114b71',
                            to: '0xc57f8628ad06663db85f534f23504a89530e4b16',
                            value: web3.toWei('0.11'),
                            gasPrice: web3.toWei('100', 'gwei'),
                        },
                        (error, mes) => {
                            if (error) message.error(error.message);
                            if (mes) message.success(mes.message);
                        }
                    );
                }

                this.setState({
                    loading: false,
                });
            });
        }
    };

    render() {
        const { loading } = this.state;
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx

        if (wallet === 0) {
            // Metamask
            return (
                <Button type="primary" loading={loading} onClick={this.connect}>
                    Metamask
                </Button>
            );
        }
        return null;
    }
}

export default injectIntl(Metamask, { withRef: true });
