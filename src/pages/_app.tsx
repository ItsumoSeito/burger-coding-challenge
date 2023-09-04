import React from 'react';
import '@/styles/globals.scss';
import classNames from 'classnames';
import type { AppProps } from 'next/app';
import { Open_Sans, Lobster } from '@next/font/google';
import { type ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { Provider } from 'react-redux';
import { CssVarsProvider, extendTheme } from '@mui/joy';
import store from '@/store/store';

const openSans = Open_Sans({
    subsets: ['latin'],
    variable: '--font-open-sans',
});
const lobster = Lobster({
    subsets: ['latin'],
    weight: '400',
    variable: '--font-lobster',
});

export default function App({
    Component,
    pageProps,
}: AppProps): ReactJSXElement {
    var customTheme = extendTheme({
        components: {
            JoyChip: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#cfcfcf',
                    },
                },
            },
            JoyButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: '#fd1302',
                        ':active': {
                            backgroundColor: '#fc4639',
                        },
                        ':hover': {
                            backgroundColor: '#df0f00',
                        },
                    },
                },
            },
            JoyBadge: {
                styleOverrides: {
                    badge: {
                        backgroundColor: '#f8904eff',
                        color: '#ffffff',
                    },
                },
            },
        },
    });

    return (
        <main className={classNames(openSans.className, lobster.variable)}>
            <CssVarsProvider theme={customTheme}>
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
            </CssVarsProvider>
        </main>
    );
}
