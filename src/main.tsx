import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './app';
import './global.css';
import { AuthProvider } from './auth/auth.provider';
import TransitionPage from './common/utils/transitionPage';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={appRouter} />
    </AuthProvider>
  </React.StrictMode>
);
