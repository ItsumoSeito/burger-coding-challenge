import { Button, FormHelperText, Input } from '@mui/joy';
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import styles from '@/styles/DiscountSection.module.scss';
import { promotionsConfig } from '@/utils/promotions';
import { dicountsConfig } from '@/utils/discounts';
import {
    selectAvailableDiscounts,
    selectAvailablePromotions,
} from '@/store/selectors';
import { calculateTotal } from '@/utils/checkout';
import {
    type CheckoutItems,
    type Discounts,
    type Promotions,
} from '@/utils/types';
import {
    addDiscount,
    addPromotion,
    setTotal,
    updateDiscountSum,
} from '@/store/store';

interface DiscountSectionProps {
    redeemedPromotions: Promotions;
    redeemedDiscounts: Discounts;
    discountSum: number;
    checkoutItems: CheckoutItems;
}

function DiscountSection(props: DiscountSectionProps) {
    var { redeemedPromotions, redeemedDiscounts, discountSum, checkoutItems } =
        props;

    var [couponCodeInputError, setCouponCodeInputError] = useState<
        string | undefined
    >();
    var [enteredCouponCode, setEnteredCouponCode] = useState<string>('');
    var availablePromotions = useSelector(selectAvailablePromotions);
    var availableDiscounts = useSelector(selectAvailableDiscounts);

    var dispatch = useDispatch();

    useEffect(
        function handleDiscountSumChange() {
            dispatch(updateDiscountSum());
        },
        [redeemedPromotions, redeemedDiscounts]
    );

    useEffect(
        function handleTotalChange() {
            dispatch(setTotal(calculateTotal(checkoutItems, discountSum)));
        },
        [checkoutItems, discountSum]
    );

    return (
        <span className={styles.code}>
            <Input
                value={enteredCouponCode}
                placeholder='Enter coupon code'
                onChange={couponCodeChangeHandler}
                error={couponCodeInputError !== undefined}
                className={styles.input}
                endDecorator={
                    <Button
                        onClick={addCouponCodeHandler}
                        disabled={enteredCouponCode === ''}
                        className={styles.button}
                    >
                        Add
                    </Button>
                }
            />
            <FormHelperText
                className={classNames(
                    styles['error-text'],
                    couponCodeInputError === undefined && 'hidden'
                )}
            >
                {couponCodeInputError}
            </FormHelperText>
        </span>
    );

    function couponCodeChangeHandler(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const {
            target: { value },
        } = event;
        setEnteredCouponCode(value);
        setCouponCodeInputError(undefined);
    }

    function addCouponCodeHandler() {
        const couponCode = enteredCouponCode.toUpperCase();
        const maxDiscountsReached =
            Object.values(redeemedDiscounts).length >=
            dicountsConfig.maxRedeemable;
        const maxPromotionsReached =
            Object.values(redeemedPromotions).length >=
            promotionsConfig.maxRedeemable;

        if (Object.keys(availableDiscounts).includes(couponCode)) {
            if (maxDiscountsReached) {
                setCouponCodeInputError('Maxmimum amount of discounts reached');
            } else {
                dispatch(addDiscount(couponCode));
            }
        } else if (Object.keys(availablePromotions).includes(couponCode)) {
            if (maxPromotionsReached) {
                setCouponCodeInputError('Maximum amount of promotions reached');
            } else if (
                availablePromotions[couponCode].discountCalculator(
                    checkoutItems
                ) > 0
            ) {
                dispatch(addPromotion(couponCode));
            } else {
                setCouponCodeInputError(
                    'Entered coupon code is not applicable'
                );
            }
        } else {
            setCouponCodeInputError('Entered coupon code is invalid');
        }
        setEnteredCouponCode('');
    }
}

export default DiscountSection;
