import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button, Icon, message } from 'antd';
import TrezorConnect, { DEVICE_EVENT, DEVICE } from 'trezor-connect';

class Trezor extends Component {
    state = {
        loading: false,
    };

    componentDidMount = () => {
        TrezorConnect.on(DEVICE_EVENT, event => {
            if (event.type === DEVICE.CONNECT) {
                message.info('TREZOR device connected');
            } else if (DEVICE.DISCONNECT) {
                message.error('TREZOR device disconnected');
            }
        });
    };

    connect = () => {
        this.setState({
            loading: true,
        });
        // https://github.com/trezor/connect/blob/develop/docs/methods/getPublicKey.md
        // ethereum: https://github.com/trezor/trezor-core/blob/tsusanka/paths/docs/coins/README.md
        TrezorConnect.getPublicKey({
            path: "m/44'/60'/0'",
        });
    };

    render() {
        const { loading } = this.state;

        return (
            <div>
                <b>TREZOR</b> <br />
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
                    Trezor
                </Button>
            </div>
        );
    }
}

export default injectIntl(Trezor, { withRef: true });
