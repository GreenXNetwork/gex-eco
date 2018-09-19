import { parse } from 'url';
import pathToRegexp from 'path-to-regexp';

const enUSProfileTransSet = {
    1: {
        lang: 'en',
        headline: 'GreenX Technology',
        description: '',
        full_address: 'Singapore',
        campaigns_number: 0,
        comments_number: 0,
        contributions_number: 0,
        avatar_url: '',
    },
    2: {
        lang: 'en',
        headline: 'INVESTOR 1',
        description: "It's me",
        full_address: 'Singapore',
        campaigns_number: 0,
        comments_number: 0,
        contributions_number: 0,
        avatar_url: '',
    },
};

const zhHansProfileTransSet = {
    1: {
        lang: 'zh-Hans',
        headline: 'GreenX Technology',
        description: '',
        full_address: 'Singapore',
        campaigns_number: 0,
        comments_number: 0,
        contributions_number: 0,
        avatar_url: '',
    },
    2: {
        lang: 'zh-Hans',
        headline: '',
        description: '',
        full_address: 'Singapore',
        campaigns_number: 0,
        comments_number: 0,
        contributions_number: 0,
        avatar_url: '',
    },
};

const profileTrans = {
    en: enUSProfileTransSet,
    'zh-Hans': zhHansProfileTransSet,
};

export function getFakeProfileTranslation(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const parsedUrl = parse(url, true);
    const { lang } = parsedUrl.query;

    const re = pathToRegexp('/api/users/:userId').exec(parsedUrl.pathname);
    const profileId = re[1];

    const profiletransSet = profileTrans[lang];
    const profiletrans = profiletransSet[profileId];

    if (res && res.json) {
        res.json(profiletrans);
    } else {
        return profiletrans;
    }
}

export default {
    getFakeProfileTranslation,
};
