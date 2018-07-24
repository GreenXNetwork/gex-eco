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
                        Project List
                    </Link>
                    <Link className={styles.item} to="/portfolio">
                        Portfolio
                    </Link>
                    <Link className={styles.item} to="/exchange">
                        Exchange
                    </Link>
                </div>
                <div className={styles.rightContainer}>
                    <LanguageButton />
                    <NotificationButton className={styles.item} />
                    <Link className={styles.item} to="/support">
                        Support
                    </Link>
                    <AccountButton className={styles.item} />
                </div>
            </div>
        );
    }
}

library.add(faCaretSquareLeft);

export default TopPanel;
