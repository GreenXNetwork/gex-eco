import React, { Component } from "react";
import { connect } from "react-redux";
import FilterSelection from "./components/FilterSelection/FilterSelection";
import styles from "./FilterPanel.module.css";
import { injectIntl, FormattedMessage  } from "react-intl";

class FilterPanel extends Component<{}, {}> {
    render() {
        return (
            <div className={this.props.className}>
                <div className={styles.header}>
                    <label>
                        <FormattedMessage id="FILTER.HEADER.FILTERS" />
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
            type: "PROJECT_TYPE",
            values: ["ALL", "PROFIT_SHARING", "ENERGY_BUY_BACK"]
        },
        {
            type: "CATEGORY",
            values: ["ALL", "SOLAR", "WIND"]
        },
        {
            type: "PROJECT_TIMING",
            values: ["ALL", "ACTIVE", "UPCOMING", "ENDED"]
        }
    ]
});

export default injectIntl(connect(mapStateToProps)(FilterPanel));
