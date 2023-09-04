import { type CheckoutItems } from './types';

export function calculateTotal(items: CheckoutItems, discount: number) {
    var total = 0;
    Object.values(items).forEach(function calculateCheckoutSum(item) {
        total += item.subtotal * item.amount;
    });
    total -= discount;
    return total;
}

export default {
    calculateTotal,
};
