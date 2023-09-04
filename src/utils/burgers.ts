import { type BurgerSize, type BurgerSizeConfig } from './types';

export var burgerIds = {
    burninChicken: 'burninChicken',
    cowsAlternative: 'cowsAlternative',
    dullGinzo: 'dullGinzo',
    elPablo: 'elPablo',
    elToro: 'elToro',
    juliusCaesar: 'juliusCaesar',
} as const;

export var burgerSizes = {
    s: 's',
    m: 'm',
    l: 'l',
} as const;

export var burgerSizesConfig: Record<BurgerSize, BurgerSizeConfig> = {
    s: {
        id: burgerSizes.s,
        multiplier: 0.7,
        label: 'Small',
    },
    m: {
        id: burgerSizes.m,
        multiplier: 1,
        label: 'Medium',
    },
    l: {
        id: burgerSizes.l,
        multiplier: 1.3,
        label: 'Large',
    },
};

export var burgerCategories = {
    vegetarian: [burgerIds.cowsAlternative],
    beef: [
        burgerIds.dullGinzo,
        burgerIds.elPablo,
        burgerIds.elToro,
        burgerIds.juliusCaesar,
    ],
    chicken: [burgerIds.burninChicken],
};

export default {
    burgerIds,
};
