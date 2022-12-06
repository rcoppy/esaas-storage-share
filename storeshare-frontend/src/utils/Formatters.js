import moment from 'moment'; 

export function formattedMoneyStylized(cost) {
    return cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        .replace('.00', '')
        .replace('.0', '');
} 

export function SquareFeetText() {
    return <>ft<sup>2</sup></>;
}

export function dateToMonthDay(date) {
    return moment(date).format("MMM Do");
}

export function dateToMonthDayYear(date) {
    return moment(date).format("MMM Do, 'YY")
}