export function formattedMoneyStylized(cost) {
    return cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
        .replace('.00', '')
        .replace('.0', '');
} 
        