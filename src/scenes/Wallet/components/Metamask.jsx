import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { Button } from 'antd';

class Metamask extends Component {
    
    state = {
        loading: false,
    }

    connect = () => {
        const {wallet} = this.props; // wallet is a prop passed from Wallet.jsx
        
        if(!window.web3) {
            alert(`${wallet.name  }is not installed`);
            return false;
        }

        const {web3} = window;
        if(wallet === 0){ // Metamask
            this.setState({ 
                loading: true,
            });

            web3.eth.getAccounts((err, accounts) => {
                if (err != null) console.error(`An error occurred: ${err}`);
                else if (accounts.length === 0) console.log("User is not logged in to MetaMask");
                else {
                    this.setState({ 
                        loading: false,
                    });
                    console.log("Done!");
                }

            });
        }
    }

    render() {
        const {loading} = this.state;
        const {wallet} = this.props; // wallet is a prop passed from Wallet.jsx

        if(wallet === 0){ // Metamask
            return (
                <Button type="primary" loading={loading} onClick={this.connect}>
                    Metamask
                </Button>
            )
        }
        return null;
    }
}

export default injectIntl(Metamask, { withRef: true });