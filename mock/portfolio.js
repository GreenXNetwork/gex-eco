export const portfoliocurrency = {
    list: ['USD'],
    current: 'USD',
};

export const portfoliosorts = [
    ['portfolio-min', 'portfolio-max'],
    ['least-profitable', 'most-profitable'],
    ['worst-project', 'best-project'],
];

export const portfoliosummary = {
    "401K's. IR A and Health Savs": 0.45,
    'Vanguard Taxable Account': 0.12,
    'Equity in Primary Home': 0.16,
    'Mr. PIE Company Pension': 0.18,
    'College Funds': 0.06,
    Cash: 0.03,
};

export const portfoliodetails = [
    {
        project_campaign: 'Health Savs',
        avg_buying_price: 12,
        amount: 12,
        total: 12,
        profit_loss: 12,
        change: '',
    },
    {
        project_campaign: 'Vanguard Taxable',
        avg_buying_price: 12,
        amount: 12,
        total: 12,
        profit_loss: 12,
        change: '',
    },
    {
        project_campaign: 'College Funds',
        avg_buying_price: 12,
        amount: 12,
        total: 12,
        profit_loss: 12,
        change: '',
    },
];

export const portfolio = {
    currency: portfoliocurrency,
    sorts: portfoliosorts,
    summary: portfoliosummary,
    details: portfoliodetails,
};
