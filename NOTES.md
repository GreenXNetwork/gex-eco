# Multilanguage And Translation
## Basic concepts
- i18n stands for internationalization.
- l10n stands for localization.
- This project is using react-intl for internationalization.
- babel-plugin-react-intl is middleware, helps to generate *.json under '/i18n-messages'.
- atool-l10n helps to collects json files under /i18n-messages and translate using google translate to json files under '/locales'. Its config file is 'l10n.configs.js'. Its translatation service is configurable.
- react-intl uses message json files under '/locales' for internationalization.

## How it works
- When we run project via command 'npm run start', babel-plugin-react-intl as middleware, collect all messages we define in component and save them to json files. You'll see the folder structure of i18n-messages is same as the src folder.
- babel-plugin-react-intl depends on the function 'defineMessages' of react-intl to catch messages of a particular component. So in order for the plugin to recognize messages in a component automatically, in the component jsx file you must do as follows:

    ``` javascript
    const messages = defineMessages({
        pageTitle: {
            id: 'UserLayout.title',
            defaultMessage: 'GreenX',
        },
        pageDescription: {
            id: 'UserLayout.description',
            defaultMessage: 'GreenX Description :D',
        },
    });
    ```

- While react server is running (by 'npm run start'), any changes you make in defineMessages block is going to corresponding json file under '/i18n-messages'.
- 'npm run trans' (call atool-l10n, see 'packages.json') translate all defined messages into zh and push to '/locales'. You can run this command anytime, just makes sure you have something under '/i18n-messages' for it. REMEMBER to run this command after you make change in defineMessages block.

## Usage during coding time
There are two ways to use react-intl. REMEMBER to declare imports.
### Declarative way
- Replace the plaintext with 
    ```html
    <FormattedMessage id={your_key} defaultMessage={your_default_message} />
    ```
- Because we already define messages (see How it works -> babel-plugin-react-intl), we can write it shorter: 
    ```html
    <FormattedMessage {...messages.pageTitle} />
    ```
    (this uses spread syntax)
    
### API way - _intl_
- react-intl provides us with api _intl_. To use this, need following:
- Declare tag IntlProvider somewhere in your app. Here we put it in '/router.js'
- What does IntlProvider need?
    - The property 'locale': its value is ,for instance, 'en-US'.
    - The property 'messages': its value is taken from json message files '/locales/*.json'.
- In order to use _intl_, you must inject it to component (see /src/layouts/UserLayout.js and /src/scenes/UserLogin/UserLogin.jsx).
    ```jsx
    class UserLayout extends React.PureComponent { ...some codes... }
    export default injectIntl(UserLayout, {
        withRef: true,
    });
    ```
- After injecting it to component, you can use: this.props.intl.formatMessage(messages.pageTitle).
            

# Coding
- The statement 'import somedefault from "./something"' is equivalent to 'require("something").default'



Last: This md file format is called markdown. See https://gist.github.com/jonschlinkert/5854601