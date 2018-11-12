import { queryProjectStory } from '../services/story';

export default {
    namespace: 'story',

    state: {
        html: '',
    },

    effects: {
        *fetchProjectStory({ payload }, { call, put }) {
            const { projectId } = payload;
            const reponse = yield call(queryProjectStory, projectId);
            yield put({
                type: 'showStory',
                payload: reponse,
            });
        },
    },

    reducers: {
        showStory(state, { payload }) {
            return {
                ...state,
                html: payload,
            };
        },
    },
};
