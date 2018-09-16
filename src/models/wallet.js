export default {
    namespace: 'wallet',

    state: {
        current: 0,
    },

    effects: {
    },

    reducers: {
        selectWallet(state, {current}){
            return {
                ...state, current,
            }
        },
    },
};