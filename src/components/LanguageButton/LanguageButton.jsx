import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { setLocale } from "../../services/locale/localeAction";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const SUPPORTED_LANG = ["en", "vi"];

class LanguageButton extends Component<{}, {}> {
    render() {
        let { lang, setLocale } = this.props;

        return (
            <Select
                native
                disableUnderline
                autoWidth
                value={lang}
                onChange={(evt) => {
                    if (evt.target.value) {
                        setLocale(evt.target.value);
                    }
                }}
            >
                {SUPPORTED_LANG.map(supportedLang => {
                    return (
                        <option key={supportedLang} value={supportedLang}>
                            {supportedLang}
                        </option>
                    );
                })}
            </Select>
        );
    }
}

LanguageButton.propTypes = {
    setLocale: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    lang: state.locale.lang
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    setLocale: lang => {
        localStorage.platformLang = lang;
        dispatch(setLocale(lang));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LanguageButton);
