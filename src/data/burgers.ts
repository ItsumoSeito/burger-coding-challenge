import { burgerIds } from '@/utils/burgers';
import { type Burger, type BurgerId } from '@/utils/types';

export var burgersTestData: Record<BurgerId, Burger> = {
    [burgerIds.burninChicken]: {
        id: burgerIds.burninChicken,
        name: "Burnin' Chicken",
        description:
            "Introducing our sizzling sensation, the Burnin Chicken burger! This fiery masterpiece combines succulent grilled chicken with a spicy kick that'll ignite your taste buds and leave you craving for more.",
        ingredients: ['Crispy Chicken', 'Bun', 'Sweet Chili Sauce', 'Lettuce'],
        price: 12.9,
    },
    [burgerIds.cowsAlternative]: {
        id: burgerIds.cowsAlternative,
        name: 'Cows Alternative',
        description:
            "Discover the future of flavor with our Cows Alternative burger! This mouthwatering creation offers a deliciously sustainable twist, featuring a plant-based patty that's as juicy and satisfying as any traditional beef burger, perfect for both your taste buds and the planet.",
        ingredients: ['Feta Patty', 'Bun', 'Olive Paste', 'Lettuce'],
        price: 10.9,
    },
    [burgerIds.dullGinzo]: {
        id: burgerIds.dullGinzo,
        name: 'Dull Ginzo',
        description:
            "Introducing the Dull Ginzo burger, a harmonious fusion of culinary cultures! This delectable masterpiece combines the rich flavors of succulent beef with the vibrant zest of Mediterranean-inspired toppings, delivering a taste experience that's anything but dull.",
        ingredients: ['Beef Patty', 'Bun', 'Red Pesto', 'Lollo Rosso'],
        price: 11.9,
    },
    [burgerIds.elPablo]: {
        id: burgerIds.elPablo,
        name: 'El Pablo',
        description:
            'Experience the bold and explosive flavors of our El Pablo burger! Crafted with premium beef, jalapeño-infused cheese, and a smoky chipotle mayo, this burger packs a spicy punch that will make your taste buds dance with delight. Elevate your burger game with El Pablo today!',
        ingredients: ['Beef patty', 'Bun', 'Homemade Aioli', 'Rocket Salad'],
        price: 13.9,
    },
    [burgerIds.elToro]: {
        id: burgerIds.elToro,
        name: 'El Toro',
        description:
            'Indulge in the irresistible allure of our El Toro burger! With a hearty Angus beef patty, topped with zesty jalapeños, creamy guacamole, and a drizzle of spicy aioli, this burger delivers a Southwestern fiesta of flavors that\'ll have you saying "Ole!" with every bite. Saddle up for a taste adventure with El Toro and experience the bold side of burger perfection.',
        ingredients: ['Beef Patty', 'Bun', 'Aioli', 'Chorizo', 'Lettuce'],
        price: 12.5,
    },
    [burgerIds.juliusCaesar]: {
        id: burgerIds.juliusCaesar,
        name: 'Julius Caesar',
        description:
            "Our Julius Caesar burger is fit for an emperor's palate! Delight in the regal combination of tender grilled chicken, crisp romaine lettuce, shaved Parmesan cheese, and Caesar dressing all nestled within a fresh bun, creating a burger that truly rules your taste buds. Experience a taste of culinary history with the Julius Caesar burger, where every bite is a triumph!",
        ingredients: [
            'Beef Patty',
            'Bun',
            'Ceasar Sauce',
            'Pine Seeds',
            'Lettuce',
        ],
        price: 14.2,
    },
};

export default {
    burgersTestData,
};
