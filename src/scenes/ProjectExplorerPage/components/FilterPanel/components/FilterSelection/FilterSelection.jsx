import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./FilterSelection.module.css";
import ReactDOM from 'react-dom';
import classNames from 'classnames';

let cx = classNames.bind(styles);

class FilterSelection extends Component<{}, {}> {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            active: true,
            maxHeight: 0
        };
    }

    toggle() {
        this.setState({
            active: !this.state.active
        });
    }

    componentDidMount() {
        let elem = ReactDOM.findDOMNode(this.refs.list);
        this.setState({
            maxHeight: elem.scrollHeight
        });
    }

    render() {
        let activatedStyle = "";
        let maxHeight = 0;
        
        if (this.state.active) {
            activatedStyle = styles.active; 
            maxHeight = this.state.maxHeight;
        }

        // let mclassNames = classNames(styles.accordion, activatedStyle);

        return (
            <div>
                <div className={classNames(styles.accordion, activatedStyle)} onClick={this.toggle}>
                    {this.props.filterType}
                </div>
                <ul ref={"list"} className={`${styles.panel}`} style={{maxHeight: maxHeight}}>
                    {this.props.filterValues.map((value, i) => {
                        return <li key={value}>{value}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default connect()(FilterSelection);
