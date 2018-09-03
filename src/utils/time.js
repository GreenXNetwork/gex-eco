import moment from 'moment';

export function getRemainingTime(dueDate) {
    let remains = {};
    let yay = false;
    let countDownTill = new Date(dueDate);
    let now = new Date();

    // Get the years
    let years = moment(countDownTill).diff(moment(), 'years');

    if (years > 0) {
        yay = true;
        remains.years = years;
        // Add years to the date
        now.setMonth(now.getMonth() + years * 12);
    }

    // Get the months
    let months = moment(countDownTill).diff(moment(), 'months');
    if (yay) {
        remains.months = months;
    } else if (months > 0) {
        yay = true;
        remains.months = months;
        // Add months to the date
        now.setMonth(now.getMonth() + months);
    }

    let days = moment(countDownTill).diff(now, 'days');
    remains.days = days;

    return remains;
}

export function getRemainingDays(dueDate) {
    let countDownTill = new Date(dueDate);
    let now = new Date();
    const remainingDays = moment(countDownTill).diff(now, 'days');
    return remainingDays > 0 ? remainingDays : 0;
}
