import { type RootState } from '@/utils/types';

export function selectSideDishesTestData(state: RootState) {
    return state.sideDishesTestData;
}

export function selectListingsTestData(state: RootState) {
    return state.listingsTestData;
}

export function selectCheckoutItems(state: RootState) {
    return state.checkoutItems;
}

export function selectAvailablePromotions(state: RootState) {
    return state.availablePromotions;
}

export function selectAvailableDiscounts(state: RootState) {
    return state.availableDiscounts;
}

export function selectRedeemedPromotions(state: RootState) {
    return state.redeemedPromotions;
}

export function selectRedeemedDiscounts(state: RootState) {
    return state.redeemedDiscounts;
}

export function selectTotal(state: RootState) {
    return state.total;
}

export function selectDiscountSum(state: RootState) {
    return state.discountSum;
}

export default {
    selectSideDishesTestData,
    selectListingsTestData,
    selectCheckoutItems,
    selectAvailablePromotions,
    selectAvailableDiscounts,
    selectRedeemedPromotions,
    selectRedeemedDiscounts,
    selectTotal,
};
