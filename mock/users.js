const users = {
    1: {
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
        city: 'Singapore',
        state: null,
        zipcode: null,
        country_id: 2,
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
        campaigns_number: 0,
        comments_number: 0,
        contributions_number: 0,
        avatar_url: '',
    },
    2: {
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
        country_id: 3,
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
        campaigns_number: 0,
        comments_number: 0,
        contributions_number: 0,
        avatar_url: '/default-avatar.png',
    },
};

export function getFakeUser(req, res) {
    const { authorization } = req.headers;
    if (authorization === 'Bearer admin_fake_token_string') {
        res.send(users[1]);
        return;
    }
    if (authorization === 'Bearer investor1_fake_token_string') {
        res.send(users[2]);
        return;
    }
    res.status(403).send({
        timestamp: 1513932555104,
        status: 403,
        error: 'Unauthorized',
        message: 'Unauthorized',
        path: '/base/category/list',
    });
}

export function updateFakeUser(req, res) {
    const update = req.body;
    const { id, ...rest } = update;
    if (users[id] === undefined) {
        res.status(404).send({
            timestamp: 1513932643431,
            status: 404,
            error: 'Not Found',
            message: `User ${id} not found`,
            path: '/api/user',
        });
    } else {
        users[id] = {
            ...users[id],
            ...rest,
        };
        res.send({ ...users[id] });
    }
}

export default {
    getFakeUser,
    updateFakeUser,
};
