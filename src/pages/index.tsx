import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, CardContent, Modal } from '@mui/joy';
import classNames from 'classnames';
import Image from 'next/image';
import successIcon from 'public/images/success.svg';
import Head from 'next/head';
import styles from '@/styles/Shop.module.scss';
import {
    selectCheckoutItems,
    selectDiscountSum,
    selectListingsTestData,
    selectRedeemedDiscounts,
    selectRedeemedPromotions,
    selectSideDishesTestData,
    selectTotal,
} from '@/store/selectors';
import BurgerItem from '@/components/BurgerItem';
import { type CheckoutItems, type BurgerListings } from '@/utils/types';
import CheckoutItem from '@/components/CheckoutItem';
import DiscountSection from '@/components/DiscountSection';
import { checkoutReset, setTotal } from '@/store/store';
import { calculateTotal } from '@/utils/checkout';

export default function Shop() {
    var sideDishesTestData = useSelector(selectSideDishesTestData);
    var listingsTestData = useSelector(selectListingsTestData);
    var checkoutItems = useSelector(selectCheckoutItems);
    var redeemedPromotions = useSelector(selectRedeemedPromotions);
    var redeemedDiscounts = useSelector(selectRedeemedDiscounts);
    var discountSum = useSelector(selectDiscountSum);
    var total = useSelector(selectTotal);
    var [modalOpen, setModalOpen] = useState(false);
    var dispatch = useDispatch();

    var discountSectionProps = {
        redeemedPromotions,
        redeemedDiscounts,
        discountSum,
        checkoutItems,
    };

    useEffect(function initializeTotal() {
        dispatch(setTotal(calculateTotal(checkoutItems, discountSum)));
    });

    return (
        <>
            <Head>
                <title>Burger Factory</title>
            </Head>
            <div className={styles.main}>
                <Modal open={modalOpen} className='modal'>
                    <Card className='modal__card'>
                        <CardContent
                            className='modal__content'
                            orientation='vertical'
                        >
                            <div className='modal__image-container'>
                                <Image
                                    src={successIcon}
                                    alt='Check'
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                        objectFit: 'contain',
                                    }}
                                />
                            </div>
                            <span className='modal__title'>
                                <p>Order was placed successfully!</p>
                            </span>
                        </CardContent>
                    </Card>
                </Modal>
                <div className={styles['order-section']}>
                    <span className={styles.header}>
                        <p>Burger Factory</p>
                    </span>
                    <div className={styles['item-list']}>
                        {renderBurgerListings(listingsTestData)}
                    </div>
                </div>
                <div className={styles['checkout-section']}>
                    <span className={styles['title-container']}>
                        <p className={styles.title}>Checkout</p>
                    </span>
                    <div className={styles['items-list']}>
                        {renderCheckoutItems(checkoutItems)}
                    </div>
                    {Object.values(checkoutItems).length > 0 && (
                        <div className={styles['summary-card']}>
                            <span className={styles['summary-title-container']}>
                                <p className={styles.title}>Summary</p>
                            </span>
                            {(Object.values(redeemedPromotions).length > 0 ||
                                Object.values(redeemedDiscounts).length >
                                    0) && (
                                // eslint-disable-next-line react/jsx-indent
                                <>
                                    <span className={styles['title-container']}>
                                        <p className={styles.title}>
                                            Discounts
                                        </p>
                                    </span>
                                    {Object.values(redeemedPromotions).length >
                                        0 && (
                                        <div
                                            className={styles['promotion-list']}
                                        >
                                            {renderPromotions()}
                                        </div>
                                    )}
                                    {Object.values(redeemedDiscounts).length >
                                        0 && (
                                        <div
                                            className={styles['discount-list']}
                                        >
                                            {renderDiscounts()}
                                        </div>
                                    )}
                                </>
                            )}
                            <DiscountSection {...discountSectionProps} />
                            <span className={styles.total}>
                                <p className={styles.label}>Total</p>
                                <p
                                    className={classNames(
                                        styles.amount,
                                        'currency'
                                    )}
                                >
                                    {total.toFixed(2)}
                                </p>
                            </span>
                            <span className={styles.order}>
                                <Button
                                    className={styles.button}
                                    onClick={orderHandler}
                                >
                                    Order now
                                </Button>
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );

    function renderBurgerListings(listings: BurgerListings) {
        return Object.entries(listings).map(function mapListing([
            key,
            listing,
        ]) {
            return (
                <BurgerItem
                    allSideDishes={sideDishesTestData}
                    listing={listing}
                    key={key}
                />
            );
        });
    }

    function renderCheckoutItems(items: CheckoutItems) {
        return Object.entries(items).map(function mapCheckoutItem([key, item]) {
            return <CheckoutItem item={item} key={key} />;
        });
    }

    function renderPromotions() {
        return Object.entries(redeemedPromotions).map(function mapPromotion([
            key,
            promotion,
        ]) {
            return (
                <Card className={styles.card} key={key}>
                    <CardContent
                        className={styles.content}
                        orientation='horizontal'
                    >
                        <p className={styles.name}>{promotion.name}</p>
                        <p className={classNames(styles.amount, 'currency')}>
                            {promotion.discountAmount.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>
            );
        });
    }

    function renderDiscounts() {
        return Object.entries(redeemedDiscounts).map(function mapDiscount([
            key,
            discount,
        ]) {
            return (
                <Card className={styles.card} key={key}>
                    <CardContent
                        className={styles.content}
                        orientation='horizontal'
                    >
                        <p className={styles.name}>{discount.name}</p>
                        <p className={classNames(styles.amount, 'currency')}>
                            {discount.discountAmount.toFixed(2)}
                        </p>
                    </CardContent>
                </Card>
            );
        });
    }

    function orderHandler() {
        setModalOpen(true);
        setTimeout(function closeModal() {
            setModalOpen(false);
        }, 3000);
        dispatch(checkoutReset());
    }
}
