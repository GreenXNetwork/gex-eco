import { defineMessages } from 'react-intl';

const commonmessages = defineMessages({
    project_type: {
        id: 'model.project.project_type',
        defaultMessage: 'Project Type',
    },
    category: {
        id: 'model.project.project_category',
        defaultMessage: 'Category',
    },
    project_timing: {
        id: 'model.project.project_timing',
        defaultMessage: 'Project Timing',
    },

    all: {
        id: 'model.project.all',
        defaultMessage: 'All',
    },
    profit_sharing: {
        id: 'model.project.profit_sharing',
        defaultMessage: 'Profit Sharing',
    },
    energy_buy_back: {
        id: 'model.project.energy_buy_back',
        defaultMessage: 'Energy Buy-back',
    },
    headline_profit_sharing: {
        id: 'model.project.headline_profit_sharing',
        defaultMessage: 'PROFIT SHARING',
    },
    headline_energy_buy_back: {
        id: 'model.project.headline.energy_buy_back',
        defaultMessage: 'ENERGY BUY BACK',
    },

    solar: {
        id: 'model.project.solar',
        defaultMessage: 'Solar',
    },
    wind: {
        id: 'model.project.wind',
        defaultMessage: 'Wind',
    },

    active: {
        id: 'model.project.active',
        defaultMessage: 'Active',
    },
    upcoming: {
        id: 'model.project.upcoming',
        defaultMessage: 'Upcoming',
    },
    ended: {
        id: 'model.project.ended',
        defaultMessage: 'Ended',
    },

    remaining_days: {
        id: 'time.remaining.days',
        defaultMessage: '{days} days left',
    },
});

export function getMessage(key) {
    if (typeof key === 'string') {
        const formatted_key = key.replace(/-/g, '_');
        return commonmessages[formatted_key];
    }
    return key;
};

export default commonmessages;
