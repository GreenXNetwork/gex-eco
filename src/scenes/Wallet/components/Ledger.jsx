import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, message } from 'antd';

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
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx

        if (wallet === 2) {
            // Ledger
            return (
                <Button type="primary" loading={loading} onClick={this.connect}>
                    Ledger
                </Button>
            );
        }
        return null;
    }
}

export default injectIntl(Ledger, { withRef: true });
