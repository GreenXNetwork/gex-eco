import mockjs from 'mockjs';
import { getRule, postRule } from './mock/rule';
import { getActivities, getNotice, getFakeList, getFakeProjects } from './mock/api';
import { getFakeChartData } from './mock/chart';
import { getProfileBasicData } from './mock/profile';
import { getProfileAdvancedData } from './mock/profile';
import { getNotices } from './mock/notices';
import { format, delay } from 'roadhog-api-doc';

// 是否禁用代理
const noProxy = process.env.NO_PROXY === 'true';

// 代码中会兼容本地 service mock 以及部署站点的静态数据
const proxy = {
    // 支持值为 Object 和 Array
    'GET /api/user': (req, res) => {
        const { authorization } = req.headers;
        if (authorization === 'Bearer admin_fake_token_string') {
            res.send({
                id: 1,
                name: 'Administrator',
                email: 'admin@greenx.network',
                created_at: '2018-08-20 07:26:57',
                updated_at: '2018-08-20 07:26:57',
                confirmed: 0,
                confirmation_code: null,
                date_of_birth: null,
                phone: null,
                address: null,
                city: null,
                state: null,
                zipcode: null,
                country_id: null,
                identity_type: null,
                identity_number: null,
                identity_image: null,
                kyc_status: 1,
                referred_by: null,
                address_id: null,
                status: 0,
                last_login_on: null,
                language: 'en',
                first_login: 1,
                force_password_change: 1,
                failed_login_count: 0,
                last_failed_login_on: null,
                notifyCount: 12,
            });
            return;
        }
        if (authorization === 'Bearer investor1_fake_token_string') {
            res.send({
                id: 2,
                name: 'Investor1',
                email: 'investor1@greenx.network',
                created_at: '2018-08-20 07:26:57',
                updated_at: '2018-08-20 07:26:57',
                confirmed: 0,
                confirmation_code: null,
                date_of_birth: null,
                phone: null,
                address: null,
                city: null,
                state: null,
                zipcode: null,
                country_id: null,
                identity_type: null,
                identity_number: null,
                identity_image: null,
                kyc_status: 1,
                referred_by: null,
                address_id: null,
                status: 0,
                last_login_on: null,
                language: 'en',
                first_login: 1,
                force_password_change: 1,
                failed_login_count: 0,
                last_failed_login_on: null,
                notifyCount: 12,
            });
            return;
        }
        res.status(403).send({
            timestamp: 1513932555104,
            status: 403,
            error: 'Unauthorized',
            message: 'Unauthorized',
            path: '/base/category/list',
        });
    },
    // GET POST 可省略
    'GET /api/users': [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ],
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
};

export default (noProxy ? {} : delay(proxy, 1000));
