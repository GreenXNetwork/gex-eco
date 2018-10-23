import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Input, Button, Icon, message } from 'antd';

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
        const { value } = this.state; // private key

        return (
            <div>
                <b>Paste your private key</b> <br />
                <Icon type="warning" theme="twoTone" />
                <i>
                    This is <b style={{ color: '#cf1322' }}>not</b> a recommended way to access your
                    wallet.
                </i>
                <p />
                <p>
                    Entering your private key on a website dangerous. If our website is compromised
                    or you accidentally visit a different website, your funds will be stolen.
                </p>
                <br />
                <Input
                    value={value}
                    onChange={this.handleChange}
                    placeholder="Enter private key"
                    onPressEnter={this.handleSubmit}
                    type="password"
                />
                <Button type="primary" onClick={this.handleSubmit}>
                    Create Account
                </Button>
            </div>
        );
    }
}

export default injectIntl(Privatekey, { withRef: true });
