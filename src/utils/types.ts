import { type StaticImageData } from 'next/image';
import type store from '@/store/store';
import { burgerIds, burgerSizes } from './burgers';
import { sideDishIds } from './sides';

// Store
export type RootState = ReturnType<typeof store.getState>;

export interface InitialState {
    sideDishesTestData: Side[];
    listingsTestData: BurgerListings;
    availableDiscounts: Discounts;
    availablePromotions: Promotions;
    checkoutItems: CheckoutItems;
    total: number;
    discountSum: number;
    redeemedDiscounts: Discounts;
    redeemedPromotions: Promotions;
}

// Burger
var burgerSizesLiteralArray = Object.values(burgerSizes);
export type BurgerSize = (typeof burgerSizesLiteralArray)[number];

export interface BurgerSizeConfig {
    id: BurgerSize;
    multiplier: number;
    label: string;
}

export interface Burger {
    id: string;
    name: string;
    description: string;
    ingredients: string[];
    price: number;
}

export interface BurgerListing {
    imageUrl: StaticImageData;
    burger: Burger;
    availableSides?: SideDishId[];
}

export type BurgerListings = Record<BurgerId, BurgerListing>;

var burgerIdsLiteralArray = Object.values(burgerIds);
export type BurgerId = (typeof burgerIdsLiteralArray)[number];

// Side dish
var sideDishIdsLiteralArray = Object.values(sideDishIds);
export type SideDishId = (typeof sideDishIdsLiteralArray)[number];

export interface Side {
    id: SideDishId;
    name: string;
    price: number;
}

// Checkout
export interface CheckoutItem {
    id: string;
    burger: Burger;
    imageUrl: StaticImageData;
    size: BurgerSize;
    sideDish?: Side;
    amount: number;
    subtotal: number;
}

export type CheckoutItems = Record<string, CheckoutItem>;

// Promotions and Discounts
export interface Promotion {
    name: string;
    discountCalculator: (items: CheckoutItems) => number;
    discountAmount: number;
    applications: number;
    getCheckoutItemId: (items: CheckoutItems) => string;
    checkoutItemId: string;
}

export type Promotions = Record<string, Promotion>;

export interface Discount {
    name: string;
    discountCalculator: (total: number) => number;
    discountAmount: number;
    applications: number;
}

export type Discounts = Record<string, Discount>;
