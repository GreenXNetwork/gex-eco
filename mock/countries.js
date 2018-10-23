const countries = [
    {
        country_id: 1,
        name: 'USA',
    },
    {
        country_id: 2,
        name: 'Singapore',
    },
    {
        country_id: 3,
        name: 'Vietnam',
    },
];

export function getFakeCountryList(req, res) {
    res.send(countries);
}

export default {
    getFakeCountryList,
};
