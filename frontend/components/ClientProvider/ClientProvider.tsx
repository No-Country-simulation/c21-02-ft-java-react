"use client";

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import React from 'react';

const ClientProvider = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
        {children}
    </Provider>
);

export default ClientProvider;