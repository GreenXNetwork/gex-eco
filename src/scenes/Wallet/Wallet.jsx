import React, { Component } from 'react';
import { Radio } from 'antd';
import { injectIntl } from 'react-intl';
import { connect } from 'dva';

import Metamask from './components/Metamask';
import Trezor from './components/Trezor';
/* const messages = defineMessages({
    metamask: {
        id: 'Wallet.metamask',
        defaultMessage: 'Metamask',
    },
    error_not_connect: {
        id: 'Wallet.error_not_connect',
        defaultMessage: 'Error! Wallet not connected',
    },
}); */
const RadioGroup = Radio.Group;

const wallets = [
    {
        key: 0,
        name: 'Metamask',

    },
    {
        key: 1,
        name: 'TREZOR',
    },
];

class Wallet extends Component {
    // state = {
    //     wallet: 0, // default to Metamask
    // }

    onChange = (e) => {
        const { dispatch } = this.props;
        console.log('radio checked', e.target.value);
        // this.setState({
        //     wallet: e.target.value,
        // })
        dispatch({
            type: 'wallet/selectWallet',
            current: e.target.value,
        });
    }

    addRadios = () => {
        const radios = [];
        for(let i = 0; i < wallets.length; i += 1){
            radios.push(<Radio key={wallets[i].key} value={wallets[i].key}>{wallets[i].name}</Radio>);
        }
        return radios;
    }

    render() {
        const {wallet} = this.props;
        return (
            <div>
                <RadioGroup onChange={this.onChange} value={wallet}>
                    {this.addRadios()}
                </RadioGroup>
                <Metamask wallet={wallet} />
                <Trezor wallet={wallet} />
            </div>
        )
    }
}

const mapStateToProps = ({ wallet, loading }) => ({
    wallet: wallet.current,
    loading,
});

export default injectIntl(connect(mapStateToProps)(Wallet), { withRef: true });