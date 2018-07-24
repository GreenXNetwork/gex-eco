import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSelection from "./components/FilterSelection/FilterSelection";
import styles from "./FilterPanel.module.css";
import { FormattedMessage } from "react-intl";

class FilterPanel extends Component<{}, {}> {
    render() {
        return (
            <div className={this.props.className}>
                <div className={styles.header}>
                    <label>
                        <FormattedMessage id="FILTER.HEADER.NAVIGATION" defaultMessage="Navigation" />
                    </label>
                </div>
                {this.props.filters.map((filter, i) => {
                    return (
                        <FilterSelection
                            key={filter.type}
                            filterType={filter.type}
                            filterValues={filter.values}
                        />
                    );
                })}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    filters: [
        {
            type: "project-type",
            values: ["all", "profit-sharing", "energy-buy-back"]
        },
        {
            type: "category",
            values: ["all", "solar", "wind"]
        },
        {
            type: "project-timing",
            values: ["all", "active", "upcoming", "ended"]
        }
    ]
});

export default connect(mapStateToProps)(FilterPanel);
