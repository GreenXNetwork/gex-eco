import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Button, message } from 'antd';

import Web3 from 'web3';

const web3 = new Web3(Web3.givenProvider || 'wss://ropsten.infura.io/ws');

class Privatekey extends Component {
    state = {
        value: '',
    };

    handleSubmit = e => {
        e.preventDefault();
        const { value } = this.state;
        try {
            // create account from keystore
            const account = web3.eth.accounts.privateKeyToAccount(value);

            if (typeof account.signTransaction === 'function') {
                // store account in store
                const { dispatch } = this.props;
                dispatch({
                    type: 'wallet/setAccount',
                    account,
                });
            }
        } catch (ex) {
            message.error(ex);
        }
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx
        const { value } = this.state; // private key

        if (wallet === 4) {
            // Keystore
            return (
                <div>
                    <Input
                        value={value}
                        onChange={this.handleChange}
                        placeholder="Enter private key"
                        onPressEnter={this.handleSubmit}
                    />
                    <Button type="primary" onClick={this.handleSubmit}>
                        Create Account
                    </Button>
                </div>
            );
        }
        return null;
    }
}

export default injectIntl(Privatekey, { withRef: true });
