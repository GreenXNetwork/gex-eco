import React, { Component } from 'react';
import { connect } from 'react-redux';

class PortfolioPage extends Component<{}, {}> {
    render() {
        return (
            <div>2 . Welcome to Portfolio :)</div>
        );
    }
}

export default connect()(PortfolioPage);