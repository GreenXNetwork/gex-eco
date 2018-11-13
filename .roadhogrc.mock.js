import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { delay } from 'roadhog-api-doc';
import { getFakeProjects } from './mock/projects';
import { getFakeProjectDetail } from './mock/projectdetails';
import { getFakeOwner } from './mock/owners';
import {
    getFakeExBalances,
    getFakeExPairs,
    getFakeExCurrencies,
    getFakeExGas,
} from './mock/exchange';
import {
    portfolio,
    portfoliocurrency,
    portfoliosorts,
    portfoliosummary,
    portfoliodetails,
} from './mock/portfolio';
import { getFakeProfileTranslation } from './mock/profiletrans';
import { getFakeUser, updateFakeUser } from './mock/users';
import { getFakeCountryList } from './mock/countries';
import { getFakeComments, getFakeCommentReplies, postFakeComment } from './mock/comments';
import { getFakeProjectInvestors } from './mock/investors';
import { getFakeStory } from './mock/story';
import { getFakeUpdates } from './mock/updates';

const noProxy = process.env.NO_PROXY === 'true';

const proxy = {
    'GET /api/user': getFakeUser,
    'GET /api/users/*': getFakeProfileTranslation,
    'POST /api/user': updateFakeUser,
    'POST /api/user/avatar': {
        avatar_url: '/default-avatar.png',
    },
    'GET /api/project/notice': getNotice,
    'GET /api/activities': getActivities,
    'GET /api/rule': getRule,
    'POST /api/rule': {
        $params: {
            pageSize: {
                desc: '分页',
                exp: 2,
            },
        },
        $body: postRule,
    },
    'POST /api/forms': (req, res) => {
        res.send({ message: 'Ok' });
    },
    'GET /api/tags': mockjs.mock({
        'list|100': [{ name: '@city', 'value|1-100': 150, 'type|0-2': 1 }],
    }),
    'GET /api/fake_list': getFakeList,
    'GET /api/fake_chart_data': getFakeChartData,
    'GET /api/profile/basic': getProfileBasicData,
    'GET /api/profile/advanced': getProfileAdvancedData,
    'POST /api/login': (req, res) => {
        const { password, email, type } = req.body;
        if (password === '888888' && email === 'admin@greenx.network') {
            res.send({
                status: 'ok',
                access_token: 'admin_fake_token_string',
                currentAuthority: 'admin',
                expires_in: 36000000,
            });
            return;
        }
        if (password === '123456' && email === 'investor1@greenx.network') {
            res.send({
                status: 'ok',
                access_token: 'investor1_fake_token_string',
                currentAuthority: 'investor',
                expires_in: 36000000,
            });
            return;
        }
        res.send({
            status: 'error',
            currentAuthority: 'guest',
        });
    },
    'POST /api/register': (req, res) => {
        res.send({ status: 'ok', currentAuthority: 'user' });
    },
    'GET /api/notices': getNotices,
    'GET /api/500': (req, res) => {
        res.status(500).send({
            timestamp: 1513932555104,
            status: 500,
            error: 'error',
            message: 'error',
            path: '/base/category/list',
        });
    },
    'GET /api/404': (req, res) => {
        res.status(404).send({
            timestamp: 1513932643431,
            status: 404,
            error: 'Not Found',
            message: 'No message available',
            path: '/base/category/list/2121212',
        });
    },
    'GET /api/403': (req, res) => {
        res.status(403).send({
            timestamp: 1513932555104,
            status: 403,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
    'GET /api/401': (req, res) => {
        res.status(401).send({
            timestamp: 1513932555104,
            status: 401,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
    'GET /api/projects': getFakeProjects,
    'GET /api/projects/*/comments': getFakeComments,
    'GET /api/projects/*/investors': getFakeProjectInvestors,
    'GET /api/projects/*/comments/*/replies': getFakeCommentReplies,
    'POST /api/projects/*/comments': postFakeComment,
    'GET /api/projects/detail/*': getFakeProjectDetail,
    'GET /api/projects/*/story': getFakeStory,
    'GET /api/projects/*/updates': getFakeUpdates,
    'GET /api/owners/*': getFakeOwner,
    'GET /api/portfolio': {
        ...portfolio,
    },
    'GET /api/portfolio/currency': {
        $body: portfoliocurrency,
    },
    'GET /api/portfolio/sorts': {
        $body: portfoliosorts,
    },
    'GET /api/portfolio/summary': {
        $body: portfoliosummary,
    },
    'GET /api/portfolio/details': {
        $body: portfoliodetails,
    },
    'GET /api/exchange/balances': getFakeExBalances,
    'GET /api/exchange/pairs': getFakeExPairs,
    'GET /api/exchange/gas': getFakeExGas,
    'GET /api/exchange/currencies': getFakeExCurrencies,
    'GET /api/countries': getFakeCountryList,
};

export default (noProxy ? {} : delay(proxy, 1000));
