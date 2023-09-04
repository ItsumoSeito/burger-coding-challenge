import { type CheckoutItem, type Promotions } from './types';
import { burgerIds } from './burgers';

export var promotionsConfig = {
    maxRedeemable: 1,
};

export var availablePromotions: Promotions = {
    'BURN-IT': {
        name: '2 for 1 - Burnin Chicken',
        discountCalculator: function calculator(items) {
            var eligibleItems = Object.values(items).filter(
                function findEligibleItem(item) {
                    return item.burger.id === burgerIds.burninChicken;
                }
            );
            if (eligibleItems.length > 1 || eligibleItems[0].amount > 1) {
                return eligibleItems[0].subtotal;
            }
            return 0;
        },
        discountAmount: 0,
        applications: 0,
        getCheckoutItemId: function returnCheckoutItemId(items) {
            return (
                Object.values(items).find(function findEligibleItem(item) {
                    return item.burger.id === burgerIds.burninChicken;
                }) as CheckoutItem
            ).id;
        },
        checkoutItemId: '',
    },
    'BIG-BOSS': {
        name: '2 for 1 - El Pablo',
        discountCalculator: function calculator(items) {
            var eligibleItems = Object.values(items).filter(
                function findEligibleItem(item) {
                    return item.burger.id === burgerIds.elPablo;
                }
            );
            if (eligibleItems.length > 1 || eligibleItems[0].amount > 1) {
                return eligibleItems[0].subtotal;
            }
            return 0;
        },
        discountAmount: 0,
        applications: 0,
        getCheckoutItemId: function returnCheckoutItemId(items) {
            return (
                Object.values(items).find(function findEligibleItem(item) {
                    return item.burger.id === burgerIds.elPablo;
                }) as CheckoutItem
            ).id;
        },
        checkoutItemId: '',
    },
};

export default {
    promotionsConfig,
    availablePromotions,
};
