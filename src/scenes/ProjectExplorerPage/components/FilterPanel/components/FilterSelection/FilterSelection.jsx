import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./FilterSelection.module.css";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { injectIntl, FormattedMessage } from "react-intl";

let cx = classNames.bind(styles);
const MULTILANG_FILTER_PREFIX = "FILTER.TYPE";

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
        let { filterType, filterValues } = this.props;

        if (this.state.active) {
            activatedStyle = styles.active;
            maxHeight = this.state.maxHeight;
        }

        // let mclassNames = classNames(styles.accordion, activatedStyle);

        return (
            <div>
                <div
                    className={classNames(styles.accordion, activatedStyle)}
                    onClick={this.toggle}
                >
                    <FormattedMessage
                        id={`${MULTILANG_FILTER_PREFIX}.${filterType}`}
                    />
                </div>
                <ul
                    ref={"list"}
                    className={`${styles.panel}`}
                    style={{ maxHeight: maxHeight }}
                >
                    {filterValues.map((value, i) => {
                        return (
                            <li key={value}>
                                <FormattedMessage
                                    id={`${MULTILANG_FILTER_PREFIX}.${filterType}.${value}`}
                                />
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default injectIntl(connect()(FilterSelection));
