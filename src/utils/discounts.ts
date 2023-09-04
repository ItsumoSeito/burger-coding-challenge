import { type Discounts } from './types';

export var dicountsConfig = {
    maxRedeemable: 1,
};

export var availableDiscounts: Discounts = {
    'FREAKY-FRIDAY': {
        name: '20% OFF!!!',
        discountCalculator: function calculator(total) {
            return total * 0.2;
        },
        discountAmount: 0,
        applications: 0,
    },
    'TOP-SECRET': {
        name: '50% OFF!!!',
        discountCalculator: function calculator(total) {
            return total * 0.5;
        },
        discountAmount: 0,
        applications: 0,
    },
};

export default {
    dicountsConfig,
    availableDiscounts,
};
