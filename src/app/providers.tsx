'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { User } from '@/types/User';
import { setUser } from '@/store/slices/userSlice';


const store = makeStore();

export function Providers({ children,user }: { children: ReactNode, user: User }) {

  if (user?.token) {
    store.dispatch(setUser(user));
  }

  return <Provider store={store}>{children}</Provider>;
}
