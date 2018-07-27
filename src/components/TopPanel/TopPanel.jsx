import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import logo from "assets/img/greenx/logo-greenx-full.svg";
import styles from "./TopPanel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCaretSquareLeft } from "@fortawesome/free-solid-svg-icons";
import NotificationButton from "./components/NotificationButton/NotificationButton";
import AccountButton from "./components/AccountButton/AccountButton";
import LanguageButton from "../LanguageButton/LanguageButton";
import { injectIntl, FormattedMessage } from "react-intl";
import { connect } from 'react-redux';

class TopPanel extends Component<{}, {}> {
    render() {
        return (
            <div className={styles.topPanelContainer}>
                <div className={styles.logoContainer}>
                    <Link to="/">
                        <img alt="" className={styles.logo} src={logo} />
                    </Link>
                </div>
                <div className={styles.hideLeftPane}>
                    <FontAwesomeIcon
                        className={styles.sign}
                        icon="caret-square-left"
                        size="sm"
                    />
                </div>
                <div className={styles.navContainer}>
                    <Link className={styles.item} to="/projects">
                        <FormattedMessage id="TOP_PANEL.PAGE.PROJECT_LIST" />
                    </Link>
                    <Link className={styles.item} to="/portfolio">
                        <FormattedMessage id="TOP_PANEL.PAGE.PORTFOLIO" />
                    </Link>
                    <Link className={styles.item} to="/exchange">
                        <FormattedMessage id="TOP_PANEL.PAGE.EXCHANGE" />
                    </Link>
                </div>
                <div className={styles.rightContainer}>
                    <LanguageButton />
                    <NotificationButton className={styles.item} />
                    <Link className={styles.item} to="/support">
                        <FormattedMessage id="TOP_PANEL.USER.SUPPORT" />
                    </Link>
                    <AccountButton className={styles.item} />
                </div>
            </div>
        );
    }
}

library.add(faCaretSquareLeft);

export default injectIntl(connect()(TopPanel));
