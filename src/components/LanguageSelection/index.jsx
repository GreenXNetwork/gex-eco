import React from 'react';
import { Select, Dropdown, Menu } from 'antd';
import PropTypes from 'prop-types';
import { IntlConsumer } from '../ReactIntlContextProvider';
import enFlag from '../../assets/flags/us.png';
import cnFlag from '../../assets/flags/cn.png';

const APP_LOCALE_MAP = {
    en: {
        locale: 'en-US',
        name: 'English',
        shortName: 'ENG',
        flag: <img style={{ width: '24px', height: '24px' }} src={enFlag} alt="" />,
    },
    zh: {
        locale: 'zh-Hans-CN',
        name: '中文',
        shortName: '中文',
        flag: <img style={{ width: '24px', height: '24px' }} src={cnFlag} alt="" />,
    },
};

function selectLang(lang, updateProps) {
    const localeProfile = APP_LOCALE_MAP[lang];
    /* eslint-disable import/no-dynamic-require */
    const appLocale = require(`../../i18n/${localeProfile.locale}.js`).default;
    updateProps({ locale: appLocale.lang, messages: appLocale.messages });
}

const { Option } = Select;

function createLangOption(localeProfile, mode, mobile = false) {
    const { icon, name, shortName } = localeProfile;

    const displayName = mobile ? shortName : name;

    if (mode === 'icon') {
        return <div>{icon}</div>;
    }

    if (mode === 'text') {
        return <div>{displayName}</div>;
    }

    return (
        <div>
            {icon} {displayName}
        </div>
    );
}

// function createLangMenu(iconOnly, onChange) {
//     return (
//         <Menu selectedKeys={[]} onClick={onChange}>
//             <Menu.Item key="en">{createLangOption(APP_FLAG_MAP.en, 'English', false)}</Menu.Item>
//             <Menu.Item key="zh">{createLangOption(APP_FLAG_MAP.zh, '中文', false)}</Menu.Item>
//         </Menu>
//     );
// }

class LanguageSelection extends React.PureComponent {
    options = {};

    constructor(props) {
        super(props);
        this.options.en = createLangOption(APP_LOCALE_MAP.en, props.mode);
        this.options.zh = createLangOption(APP_LOCALE_MAP.zh, props.mode);
    }

    onDropdownValueChange = updateProps => {
        return function(value) {
            selectLang(value.key, updateProps);
        };
    };

    createLangMenu = (mode, onChange) => {
        return (
            <Menu selectedKeys={[]} onClick={onChange}>
                <Menu.Item key="en">{this.options.en}</Menu.Item>
                <Menu.Item key="zh">{this.options.zh}</Menu.Item>
            </Menu>
        );
    };

    render() {
        // const { selectedNode } = this.state;
        const { className, hover, mode, mobile } = this.props;

        return (
            <IntlConsumer>
                {({ updateProps, providerProps }) =>
                    hover ? (
                        <Dropdown
                            className={className}
                            overlay={this.createLangMenu(
                                mode,
                                this.onDropdownValueChange(updateProps)
                            )}
                        >
                            <div>
                                {createLangOption(
                                    APP_LOCALE_MAP[providerProps.locale],
                                    mode,
                                    mobile
                                )}
                            </div>
                        </Dropdown>
                    ) : (
                        <Select
                            className={className}
                            defaultValue={providerProps.locale}
                            style={{ width: 100 }}
                            onChange={value => selectLang(value, updateProps)}
                        >
                            <Option value="en">{this.options.en}</Option>
                            <Option value="zh">{this.options.zh}</Option>
                        </Select>
                    )
                }
            </IntlConsumer>
        );
    }
}

const defaultProps = {
    hover: false,
    mode: 'all', // text, icon,
    mobile: false,
};
LanguageSelection.defaultProps = defaultProps;

const propTypes = {
    hover: PropTypes.bool,
    mode: PropTypes.string,
    mobile: PropTypes.bool,
};
LanguageSelection.propTypes = propTypes;

export default LanguageSelection;
