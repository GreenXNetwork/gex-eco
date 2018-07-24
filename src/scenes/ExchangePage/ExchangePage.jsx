import React, { Component } from "react";
import { connect } from 'react-redux';

class ExchangePage extends Component<{}, {}> {
    render() {
        return (
            <div>This is exchange page</div>
        );
    }
}

export default connect()(ExchangePage);