import React from 'react';

import Image from 'next/image';
import { Badge, Button, Divider } from '@mui/joy';
import classNames from 'classnames';
import trashIcon from 'public/images/trash.svg';
import { useDispatch } from 'react-redux';
import styles from '@/styles/CheckoutItem.module.scss';
import { type CheckoutItem as CheckoutItemType } from '@/utils/types';
import { cleanUpDiscounts, removeFromCart } from '@/store/store';
import { burgerSizesConfig } from '@/utils/burgers';

interface CheckoutItemProps {
    item: CheckoutItemType;
}

function CheckoutItem(props: CheckoutItemProps) {
    var {
        item: {
            id,
            burger: { name: burgerName, price: burgerPrice },
            imageUrl,
            size,
            sideDish,
            amount,
            subtotal,
        },
    } = props;
    var dispatch = useDispatch();

    return (
        <div className={styles.item}>
            <div className={styles.image}>
                <Image
                    src={imageUrl}
                    alt='Burger'
                    style={{
                        width: '90%',
                        height: '90%',
                        objectFit: 'cover',
                    }}
                />
            </div>
            <div className={styles.details}>
                <span className={styles.burger}>
                    <Badge
                        badgeContent={size.toUpperCase()}
                        className={styles.badge}
                        variant='plain'
                        size='sm'
                        badgeInset='0px -5px'
                    >
                        <p className={styles.name}>{burgerName}</p>
                    </Badge>
                    <p className={classNames(styles.price, 'currency')}>
                        {(
                            burgerPrice * burgerSizesConfig[size].multiplier
                        ).toFixed(2)}
                    </p>
                </span>
                {sideDish !== undefined && (
                    <span className={styles['side-dish']}>
                        <p className={styles.name}>{sideDish.name}</p>
                        <p className={classNames(styles.price, 'currency')}>
                            {sideDish.price.toFixed(2)}
                        </p>
                    </span>
                )}
                <Divider className={styles['subtotal-divider']} />
                <span className={styles['sub-total']}>
                    <p className={styles.amount}>{amount}</p>
                    <p className={classNames(styles.price, 'currency')}>
                        {subtotal.toFixed(2)}
                    </p>
                </span>
                <span
                    className={styles['multiplied-subtotal-divider-container']}
                >
                    <Divider
                        className={styles['multiplied-subtotal-divider']}
                    />
                </span>
                <span className={styles['multiplied-subtotal']}>
                    <p className={classNames(styles.price, 'currency')}>
                        {(subtotal * amount).toFixed(2)}
                    </p>
                </span>
                <span className={styles.delete}>
                    <Button onClick={deleteItemHandler}>
                        <Image
                            src={trashIcon}
                            alt='Delete'
                            style={{
                                width: '80%',
                                height: '80%',
                                objectFit: 'contain',
                            }}
                        />
                    </Button>
                </span>
            </div>
        </div>
    );

    function deleteItemHandler() {
        dispatch(removeFromCart(id));
        dispatch(cleanUpDiscounts(id));
    }
}

export default CheckoutItem;
