import React from 'react';
import { IntlConsumer } from '../ReactIntlContextProvider';
import { Select } from 'antd';

const APP_LOCALE_MAP = {
    en: 'en-US',
    zh: 'zh-Hans-CN',
};

const selectLang = function(lang, updateProps) {
    const localeProfile = APP_LOCALE_MAP[lang];
    const appLocale = require(`./../../i18n/${localeProfile}.js`).default;
    updateProps({ locale: appLocale.lang, messages: appLocale.messages });
};

const Option = Select.Option;

class LanguageSelection extends React.PureComponent {
    render() {
        return (
            <IntlConsumer>
                {({ updateProps, providerProps }) => (
                    <Select
                        className={this.props.className}
                        defaultValue={providerProps.locale}
                        style={{ width: 100 }}
                        onChange={value => selectLang(value, updateProps)}
                    >
                        <Option value="en">English</Option>
                        <Option value="zh">中文</Option>
                    </Select>
                )}
            </IntlConsumer>
        );
    }
}
export default LanguageSelection;
