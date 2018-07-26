import React, { Component } from "react";
import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
import { connect } from "react-redux";
import { IntlProvider } from "react-intl";
import PropTypes from "prop-types";
import AuthenticatedRoute from "./components/AuthenticatedRoute/AuthenticatedRoute";
import LoginPage from "./scenes/LandingPage/LoginPage";
import PortfolioPage from "./scenes/PortfolioPage/PortfolioPage";
import ExchangePage from "./scenes/ExchangePage/ExchangePage";
import ProjectExplorerPage from "./scenes/ProjectExplorerPage/ProjectExplorerPage";

class App extends Component<{}, {}> {
    render() {
        const { lang } = this.props;
        return (
            <IntlProvider locale={lang} messages={require(`i18n/${lang}.json`)}>
                <Router>
                    <Switch>
                        <Route exact path="/" component={LoginPage} />
                        <Route path="/login" component={LoginPage} />
                        <Route
                            path="/projects"
                            component={ProjectExplorerPage}
                        />
                        <AuthenticatedRoute
                            path="/portfolio"
                            component={PortfolioPage}
                        />
                        <Route path="/exchange" component={ExchangePage} />
                    </Switch>
                </Router>
            </IntlProvider>
        );
    }
}

App.propTypes = {
    lang: PropTypes.string.isRequired
};

App.defaultProps = {
    lang: "en"
};

const mapStateToProps = state => ({
    lang: state.locale.lang
});

export default connect(mapStateToProps)(App);
