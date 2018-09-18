export default {
    namespace: 'wallet',

    state: {
        current: 0,
        account: undefined,
    },

    effects: {},

    reducers: {
        selectWallet(state, { current }) {
            return {
                ...state,
                current,
            };
        },

        setAccount(state, { account }) {
            return {
                ...state,
                account,
            };
        },
    },
};
