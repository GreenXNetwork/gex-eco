import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';

// import Transport from "@ledgerhq/hw-transport-node-hid";
// import Eth from "@ledgerhq/hw-app-eth";

class Ledger extends Component {
    state = {
        loading: false,
    };

    /* getEthAddress = async () => {
        const transport = await Transport.create();
        const eth = new Eth(transport);
        const result = await eth.getAddress("m/44'/60'/0'");
        console.log('result', result);
        return result.address;
    }; */

    connect = () => {
        const { wallet } = this.props; // wallet is a prop passed from Wallet.jsx

        if (wallet === 2) {
            this.setState({
                loading: true,
            });

            // https://github.com/LedgerHQ/ledgerjs
            // this.getEthAddress().then(a => console.log(a));
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
