import React, { Component } from "react";
import { connect } from "react-redux";
import avatar1 from "assets/img/avatar/avatar1.jpg";
import styles from "./AccountButton.module.css";

class AccountButton extends Component<{}, {}> {
    render() {
        return (
            <div className={this.props.className}>
                <img alt="" src={avatar1} className={`${styles.userImgSize} img-circle`} />
            </div>
        );
    }
}

export default connect()(AccountButton);
