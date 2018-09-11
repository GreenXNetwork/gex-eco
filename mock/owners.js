import pathToRegexp from 'path-to-regexp';

const owners = {
    '1': {
        owner_name: 'Nesa Investment Holdings',
        owner_type: 'Campaigner',
        owner_logo_url: 'http://www.nesaih.co.za/css/images/NesaLogo_168x86.png',
        owner_website: 'www.nesaih.co.za',
        onwer_email: 'info@nesaih.co.za',
        owner_linkedin: '',
        owner_facebook: '',
        owner_twitter: '',
        owner_verified_email: true,
        owner_verififed_linkedin: false,
        owner_verified_facebook: false,
        owner_no_campaigns: 10,
        owner_raised_fund: 2000000,
    },
};

export function getFakeOwner(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }

    const re = pathToRegexp('/api/owners/:id').exec(url);
    const ownerId = re[1];

    const result = owners[ownerId];

    if (res && res.json) {
        res.json(result);
    } else {
        return result;
    }
}

export default {
    getFakeOwner,
};
