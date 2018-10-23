import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Icon, message } from 'antd';

class Metamask extends Component {
    state = {
        loading: false,
    };

    connect = () => {
        if (!window.web3) {
            message.error(`Metamask is not installed`);
            return false;
        }

        // Metamask extension inject its own 'web3' to window when installed
        const { web3 } = window;
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
                        from: '0x6De037bf6D5B933285711232330B933deafB16F5',
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
    };

    render() {
        const { loading } = this.state;

        return (
            <div>
                <b>MetaMask / Mist</b> <br />
                <Icon type="check-circle" theme="twoTone" />
                <i>This is a recommended way to access your wallet.</i>
                <p />
                <p>
                    MetaMask is a browser extension that allows you to access your wallet quickly,
                    safely & easily. It is more secure because you never enter your private key on a
                    website. It protects you from phishing & malicious websites.
                </p>
                <br />
                <Button type="primary" loading={loading} onClick={this.connect}>
                    Connect Metamask
                </Button>
            </div>
        );
    }
}

export default injectIntl(Metamask, { withRef: true });
