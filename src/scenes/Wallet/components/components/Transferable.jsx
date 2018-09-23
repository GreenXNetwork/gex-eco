import React, { Component } from 'react';
import { Button, Input, message } from 'antd';
import { injectIntl } from 'react-intl';
import Web3 from 'web3';

const web3 = new Web3('wss://ropsten.infura.io/ws');

// these component is shown when account info is in store
// used with Keystore & Privatekey method, where we get inputs from user and send transaction manually
class Transferable extends Component {
    state = {
        toAddress: '',
        value: '',
        gas: 2000000,
    }

    handleSubmit = () => {
        this.transfer();
    }

    transfer = () => {
        const { account } = this.props;
        const {toAddress, value, gas} = this.state;
        account
            .signTransaction({
                to: toAddress,
                value,
                gas,
            })
            .then(result => {
                return web3.eth.sendSignedTransaction(result.rawTransaction);
            })
            .catch(error => {
                message.error(error.toString());
            });
    };

    render() {
        const {value, toAddress, gas} = this.state;
        return (
            <div>
                <br />
                <Input
                    value={toAddress}
                    onChange={(e) => {
                        this.setState({
                            toAddress: e.target.value,
                        });
                    }}
                    placeholder="Enter toAddress"
                    onPressEnter={this.handleSubmit}
                />
                <Input
                    value={value}
                    onChange={(e) => {
                        this.setState({
                            value: e.target.value,
                        });
                    }}
                    placeholder="Enter value"
                    onPressEnter={this.handleSubmit}
                />
                <Input
                    value={gas}
                    onChange={(e) => {
                        this.setState({
                            gas: e.target.value,
                        });
                    }}
                    placeholder="Enter gas"
                    onPressEnter={this.handleSubmit}
                />
                <Button type="danger" onClick={this.transfer}>
                    Send Transaction!
                </Button>
            </div>
            
        );
    }
};

export default injectIntl(Transferable, { withRef: true });