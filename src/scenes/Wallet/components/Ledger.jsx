import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Icon, message } from 'antd';

class Ledger extends Component {
    state = {
        loading: false,
    };

    componentDidMount = () => {
        window.Ledger.init({
            callback: event => {
                if (!event) message.error('Chrome app not available.');
                const { response } = event;
                if (response && response.command === 'ping') {
                    message.success('Chrome app is available.');
                }
                if (response && response.command === 'launch') {
                    console.log('Chrome app has been launched.');
                }
            },
        });

        window.Ledger.isAppAvailable();
    };

    connect = () => {
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx

        if (wallet === 2) {
            this.setState({
                loading: true,
            });

            // https://github.com/LedgerHQ/ledger-wallet-api
            window.Ledger.launchApp();
        }
    };

    render() {
        const { loading } = this.state;

        return (
            <div>
                <b>Ledger Hardware Wallet</b> <br />
                <Icon type="check-circle" theme="twoTone" />
                <i>This is a recommended way to access your wallet.</i>
                <p />
                <p>
                    A hardware wallet is a small USB device that allows you to access your wallet
                    quickly, safely & easily. It is more secure because your private key never
                    leaves the hardware wallet. It protects you from phishing, malware, and more.
                </p>
                <br />
                <Button type="primary" loading={loading} onClick={this.connect}>
                    Ledger
                </Button>
            </div>
        );
    }
}

export default injectIntl(Ledger, { withRef: true });
