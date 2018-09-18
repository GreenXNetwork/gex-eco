import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';

import TrezorConnect from 'trezor-connect';

class Trezor extends Component {
    state = {
        loading: false,
    };

    connect = () => {
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx

        if (wallet === 1) {
            // Trezor
            this.setState({
                loading: true,
            });
            // https://github.com/trezor/connect/blob/develop/docs/methods/getPublicKey.md
            // ethereum: https://github.com/trezor/trezor-core/blob/tsusanka/paths/docs/coins/README.md
            TrezorConnect.getPublicKey({
                path: "m/44'/60'/0'",
            });
        }
    };

    render() {
        const { loading } = this.state;
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx

        if (wallet === 1) {
            // Trezor
            return (
                <Button type="primary" loading={loading} onClick={this.connect}>
                    Trezor
                </Button>
            );
        }
        return null;
    }
}

export default injectIntl(Trezor, { withRef: true });
