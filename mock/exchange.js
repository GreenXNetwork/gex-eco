const pairs = {
    'gex-pr1': {
        pair_id: 'gex-pr1',
        pair_text: 'GreenX / Project 01',
        rate: 0.2,
    },
    'gex-pr2': {
        pair_id: 'gex-pr1',
        pair_text: 'GreenX / Project 01',
        rate: 0.2,
    },
    'gex-pr3': {
        pair_id: 'gex-pr1',
        pair_text: 'GreenX / Project 01',
        rate: 0.2,
    },
};
const currencies = {
    gex: {
        symbol: 'GEX',
        name: 'GreenX Network',
        contract: '0xdac15794f0fadfdcf3a93aeaabdc7cac19066724',
        project_sector: 'Energy',
        market_cap: 70000000,
    },
    pr1: {
        symbol: 'PR1',
        name: 'Green Project 1',
        contract: '0xdac15794f0fadfdcf3a93aeaabdc7cac19066724',
        project_sector: 'Energy',
        market_cap: 70000000,
    },
    pr2: {
        symbol: 'PR2',
        name: 'Green Project 2',
        contract: '0xdac15794f0fadfdcf3a93aeaabdc7cac19066724',
        project_sector: 'Energy',
        market_cap: 70000000,
    },
    pr3: {
        symbol: 'PR3',
        name: 'Green Project 3',
        contract: '0xdac15794f0fadfdcf3a93aeaabdc7cac19066724',
        project_sector: 'Energy',
        market_cap: 70000000,
    },
};
const balances = {
    gex: {
        amount: 1000000.12356789,
        locked: 600000,
    },
    pr1: {
        amount: 33.3333,
        locked: 10,
    },
    pr2: {
        amount: 2000000,
        locked: 600000,
    },
    pr3: {
        amount: 3000000,
        locked: 700000,
    },
};
const gasprice = {
    price: {
        min: '4Gwei',
        max: '6Gwei',
    },
};

export function getFakeExPairs(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    if (res && res.json) {
        res.json(pairs);
    } else {
        return pairs;
    }
}

export function getFakeExCurrencies(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    if (res && res.json) {
        res.json(currencies);
    } else {
        return currencies;
    }
}

export function getFakeExBalances(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    if (res && res.json) {
        res.json(balances);
    } else {
        return balances;
    }
}
export function getFakeExGas(req, res, u) {
    let url = u;
    if (!url || Object.prototype.toString.call(url) !== '[object String]') {
        url = req.url; // eslint-disable-line
    }
    if (res && res.json) {
        res.json(gasprice);
    } else {
        return gasprice;
    }
}

export default {
    getFakeExBalances,
    getFakeExPairs,
    getFakeExCurrencies,
    getFakeExGas,
};
