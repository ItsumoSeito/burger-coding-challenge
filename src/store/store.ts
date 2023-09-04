/* eslint-disable no-param-reassign */
import { createAction, createReducer, configureStore } from '@reduxjs/toolkit';
import { type InitialState, type CheckoutItem } from '@/utils/types';
import { sideDishesTestData } from '@/data/sides';
import { listingsTestData } from '@/data/listings';
import { availableDiscounts } from '@/utils/discounts';
import { availablePromotions } from '@/utils/promotions';

var initialState: InitialState = {
    sideDishesTestData,
    listingsTestData,
    availableDiscounts,
    availablePromotions,
    checkoutItems: {},
    total: 0,
    discountSum: 0,
    redeemedDiscounts: {},
    redeemedPromotions: {},
};

export var addToCart = createAction<CheckoutItem>('addToCart');
export var removeFromCart = createAction<string>('removeFromCart');
export var addPromotion = createAction<string>('addPromotion');
export var addDiscount = createAction<string>('addDiscount');
export var cleanUpDiscounts = createAction<string>('cleanUpDiscounts');
export var setTotal = createAction<number>('setTotal');
export var updateDiscountSum = createAction('updateDiscountSum');
export var checkoutReset = createAction('checkoutReset');

var reducer = createReducer(initialState, function buildReducer(builder) {
    builder.addCase(addToCart, function storeAddToCart(state, action) {
        var {
            payload,
            payload: { amount, id },
        } = action;

        if (Object.keys(state.checkoutItems).includes(id)) {
            let checkoutItem = { ...state.checkoutItems[id] };
            state.checkoutItems[id] = {
                ...checkoutItem,
                amount: checkoutItem.amount + amount,
            };
        } else {
            state.checkoutItems[id] = payload;
        }
    });

    builder.addCase(
        removeFromCart,
        function storeRemoveFromCart(state, action) {
            const { payload: id } = action;
            delete state.checkoutItems[id];
        }
    );

    builder.addCase(addPromotion, function storeAddPromotion(state, action) {
        const { payload: promotionCode } = action;

        const calculatedDiscount = state.availablePromotions[
            promotionCode
        ].discountCalculator(state.checkoutItems);

        // Promotion code was already redeemed => will only
        // update applications and discount amount this promotion accounts for
        if (Object.keys(state.redeemedPromotions).includes(promotionCode)) {
            var existingPromotion = state.redeemedPromotions[promotionCode];
            const newDiscountAmount =
                existingPromotion.discountAmount + calculatedDiscount;
            const newApplicationAmount = existingPromotion.applications + 1;

            state.redeemedPromotions[promotionCode] = {
                ...existingPromotion,
                discountAmount: newDiscountAmount,
                applications: newApplicationAmount,
                checkoutItemId: existingPromotion.getCheckoutItemId(
                    state.checkoutItems
                ),
            };
        } else {
            state.redeemedPromotions[promotionCode] = {
                ...state.availablePromotions[promotionCode],
                discountAmount: calculatedDiscount,
                applications: 1,
                checkoutItemId: state.availablePromotions[
                    promotionCode
                ].getCheckoutItemId(state.checkoutItems),
            };
        }
    });

    builder.addCase(addDiscount, function storeAddDiscount(state, action) {
        const { payload: discountCode } = action;

        const calculatedDiscount = state.availableDiscounts[
            discountCode
        ].discountCalculator(state.total);

        // Discount code was already redeemed => will only
        // update applications and discount amount this discount accounts for
        if (Object.keys(state.redeemedDiscounts).includes(discountCode)) {
            var existingDiscount = state.redeemedDiscounts[discountCode];
            const newDiscountAmount =
                existingDiscount.discountAmount + calculatedDiscount;
            const newApplicationAmount = existingDiscount.applications + 1;

            state.redeemedDiscounts[discountCode] = {
                ...existingDiscount,
                discountAmount: newDiscountAmount,
                applications: newApplicationAmount,
            };
        } else {
            state.redeemedDiscounts[discountCode] = {
                ...state.availableDiscounts[discountCode],
                discountAmount: calculatedDiscount,
                applications: 1,
            };
        }
    });

    builder.addCase(
        cleanUpDiscounts,
        function storeCleanUpDiscounts(state, action) {
            const { payload: checkoutItemId } = action;
            var concernedPromotionEntry = Object.entries(
                state.redeemedPromotions
            ).find(function findPromotionByCheckoutItemId([key, promotion]) {
                return promotion.checkoutItemId === checkoutItemId;
            });
            const id =
                concernedPromotionEntry !== undefined
                    ? concernedPromotionEntry[0]
                    : undefined;
            if (id !== undefined) {
                delete state.redeemedPromotions[id];
            }
        }
    );

    builder.addCase(setTotal, function storeSetTotal(state, action) {
        const { payload: newTotal } = action;
        state.total = newTotal;
    });

    builder.addCase(updateDiscountSum, function storeUpdateDiscountSum(state) {
        var newDiscountSum = 0;
        var allDiscounts = [
            ...Object.values(state.redeemedPromotions),
            ...Object.values(state.redeemedDiscounts),
        ];
        allDiscounts.forEach(function getSum(element) {
            newDiscountSum += element.discountAmount;
        });

        state.discountSum = newDiscountSum;
    });

    builder.addCase(checkoutReset, function storeCheckoutReset(state) {
        state.checkoutItems = initialState.checkoutItems;
        state.redeemedPromotions = initialState.redeemedPromotions;
        state.redeemedDiscounts = initialState.redeemedDiscounts;
        state.total = initialState.total;
        state.discountSum = initialState.discountSum;
    });
});

var store = configureStore({
    reducer,
    middleware: function defaultMiddlewareCb(getDefaultMiddleware) {
        return getDefaultMiddleware({ serializableCheck: false });
    },
});

export default store;
