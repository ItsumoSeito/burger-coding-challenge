import React, { useEffect, useState } from 'react';
import uuid4 from 'uuid4';

import Image from 'next/image';
import { Button, Chip, Input, Select, Option, FormLabel } from '@mui/joy';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import {
    type BurgerSize,
    type BurgerListing,
    type Side,
    type SideDishId,
} from '@/utils/types';
import styles from '@/styles/BurgerItem.module.scss';

import { addToCart } from '@/store/store';
import { burgerSizes, burgerSizesConfig } from '@/utils/burgers';

interface BurgerItemProps {
    listing: BurgerListing;
    allSideDishes: Side[];
}

function BurgerItem(props: BurgerItemProps) {
    var {
        listing: {
            imageUrl,
            burger,
            burger: {
                id: burgerId,
                name,
                description,
                ingredients,
                price: burgerPrice,
            },
            availableSides,
        },
        allSideDishes,
    } = props;

    var dispatch = useDispatch();
    var [subtotal, setSubtotal] = useState(burgerPrice);
    var [selectedSideDishId, setSelectedSideDishId] = useState<SideDishId | ''>(
        ''
    );
    var [selectedAmount, setSelectedAmount] = useState<number>(1);
    var [selectedSize, setSelectedSize] = useState<BurgerSize>(burgerSizes.m);

    var filteredSideDishes = allSideDishes.filter(function filterAvailableSides(
        side
    ) {
        return availableSides?.includes(side.id);
    });

    var noSideOption = (
        <Option value='' key={uuid4()}>
            No Thanks
        </Option>
    );

    useEffect(
        function handleSubtotalChange() {
            var selectedSideDish = allSideDishes.find(function findSideDishById(
                side
            ) {
                return side.id === selectedSideDishId;
            });
            const sideDishPrice =
                selectedSideDish !== undefined ? selectedSideDish.price : 0;
            const burgerPriceMultiplicator =
                burgerSizesConfig[selectedSize].multiplier;
            var newSubtotal =
                sideDishPrice + burgerPrice * burgerPriceMultiplicator;
            setSubtotal(newSubtotal);
        },
        [selectedSize, selectedSideDishId]
    );

    return (
        <div className={styles['burger-item']}>
            <div className={styles['hero-image']}>
                <Image
                    src={imageUrl}
                    alt='Burger'
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div className={styles.details}>
                <span>
                    <p className={styles.title}>{name}</p>
                </span>
                <span>
                    <p className={styles.description}>{description}</p>
                </span>
                <div className={styles.ingredients}>
                    {ingredients.map(renderIngredientChips)}
                </div>
                <span>
                    <p className={classNames(styles.subtotal, 'currency')}>
                        {subtotal.toFixed(2)}
                    </p>
                </span>
                <span className={styles['side-controls']}>
                    <FormLabel className={styles.label}>Side dish</FormLabel>
                    <Select
                        value={selectedSideDishId}
                        onChange={sideDishChangeHandler}
                        className={styles.select}
                    >
                        {[
                            noSideOption,
                            ...filteredSideDishes.map(renderSideDishOption),
                        ]}
                    </Select>
                </span>
                <span className={styles['size-controls']}>
                    <FormLabel className={styles.label}>Burger Size</FormLabel>
                    <Select
                        value={selectedSize}
                        onChange={sizeChangeHandler}
                        className={styles.select}
                    >
                        {Object.values(burgerSizes).map(renderSizeOption)}
                    </Select>
                </span>
                <span className={styles['amount-controls']}>
                    <Input
                        type='number'
                        onChange={amountChangeHandler}
                        value={selectedAmount}
                        className={styles.amount}
                    />
                    <Button
                        onClick={addToCartHandler}
                        size='lg'
                        sx={{
                            bgcolor: 'background.accent',
                        }}
                        className={styles['add-button']}
                    >
                        Add
                    </Button>
                </span>
            </div>
        </div>
    );

    function renderIngredientChips(ingredient: string) {
        return (
            <Chip
                children={ingredient}
                sx={{
                    bgcolor: 'background.lightGrey',
                }}
                key={uuid4()}
            />
        );
    }

    function renderSideDishOption(sideDish: Side) {
        return (
            <Option value={sideDish.id} key={uuid4()}>
                {sideDish.name}
            </Option>
        );
    }

    function sideDishChangeHandler(
        event: React.SyntheticEvent | null,
        value: SideDishId | '' | null
    ) {
        setSelectedSideDishId(value ?? '');
    }

    function amountChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setSelectedAmount(Math.max(1, Number(event.target.value)));
    }

    function addToCartHandler() {
        var hydratedSideDish =
            selectedSideDishId !== null
                ? allSideDishes.find(function findBySideDishId(side) {
                      return side.id === selectedSideDishId;
                  })
                : undefined;

        var newCheckoutItem = {
            id: [burgerId, selectedSize, selectedSideDishId].join('-'),
            burger,
            imageUrl,
            sideDish: hydratedSideDish,
            amount: selectedAmount,
            size: selectedSize,
            subtotal,
        };
        dispatch(addToCart(newCheckoutItem));
        setSelectedAmount(1);
        setSelectedSideDishId('');
        setSelectedSize(burgerSizes.m);
    }

    function renderSizeOption(size: BurgerSize) {
        return (
            <Option value={size} key={uuid4()}>
                {burgerSizesConfig[size].label}
            </Option>
        );
    }

    function sizeChangeHandler(
        event: React.SyntheticEvent | null,
        value: BurgerSize | null
    ) {
        setSelectedSize(value ?? burgerSizes.m);
    }
}

export default BurgerItem;
