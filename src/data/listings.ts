import BurgerBurninChicken from 'public/images/BurgerBurninChicken.jpg';
import BurgerCowsAlternative from 'public/images/BurgerCowsAlternative.jpg';
import BurgerDullGinzo from 'public/images/BurgerDullGinzo.jpg';
import BurgerElPablo from 'public/images/BurgerElPablo.jpg';
import BurgerElToro from 'public/images/BurgerElToro.jpg';
import BurgerJuliusCaesar from 'public/images/BurgerJuliusCaesar.jpg';

import { type BurgerListings } from '@/utils/types';
import { burgersTestData } from './burgers';
import { sideDishIds } from '@/utils/sides';
import { burgerIds } from '@/utils/burgers';

export var listingsTestData: BurgerListings = {
    [burgerIds.burninChicken]: {
        burger: burgersTestData.burninChicken,
        imageUrl: BurgerBurninChicken,
        availableSides: [
            sideDishIds.fries,
            sideDishIds.curlyFries,
            sideDishIds.salad,
        ],
    },
    [burgerIds.cowsAlternative]: {
        burger: burgersTestData.cowsAlternative,
        imageUrl: BurgerCowsAlternative,
        availableSides: [sideDishIds.curlyFries, sideDishIds.salad],
    },
    [burgerIds.dullGinzo]: {
        burger: burgersTestData.dullGinzo,
        imageUrl: BurgerDullGinzo,
        availableSides: [sideDishIds.fries, sideDishIds.curlyFries],
    },
    [burgerIds.elPablo]: {
        burger: burgersTestData.elPablo,
        imageUrl: BurgerElPablo,
        availableSides: [
            sideDishIds.fries,
            sideDishIds.curlyFries,
            sideDishIds.salad,
        ],
    },
    [burgerIds.elToro]: {
        burger: burgersTestData.elToro,
        imageUrl: BurgerElToro,
        availableSides: [
            sideDishIds.fries,
            sideDishIds.curlyFries,
            sideDishIds.salad,
        ],
    },
    [burgerIds.juliusCaesar]: {
        burger: burgersTestData.juliusCaesar,
        imageUrl: BurgerJuliusCaesar,
        availableSides: [sideDishIds.fries, sideDishIds.salad],
    },
};

export default {
    listingsTestData,
};
