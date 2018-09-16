import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';

import TrezorConnect from 'trezor-connect';

class Trezor extends Component {
    
    state = {
        loading: false,
    }

    connect = () => {
        const {wallet} = this.props; // wallet is a prop passed from Wallet.jsx

        if(wallet === 1){ // Trezor
            this.setState({ 
                loading: true,
            });
            // https://github.com/trezor/connect/blob/develop/docs/methods/requestLogin.md
            // this should be called in back-end
            /* TrezorConnect.requestLogin({ 
                challengeHidden: '0123456789abcdef',
                challengeVisual: 'Login to',
            }); */
            TrezorConnect.ethereumGetAddress({
                path: "m/44'/60'/0'",
            });
        }
    }

    render() {
        const {loading} = this.state;
        const {wallet} = this.props; // wallet is a prop passed from Wallet.jsx

        if(wallet === 1){ // Trezor
            return (
                <Button type="primary" loading={loading} onClick={this.connect}>
                    Trezor
                </Button>
            )
        }
        return null;
    }
}

export default injectIntl(Trezor, { withRef: true });