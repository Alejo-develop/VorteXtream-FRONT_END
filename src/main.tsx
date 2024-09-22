import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { appRouter } from './app';
import './global.css';
import { AuthProvider } from './auth/auth.provider';

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <RouterProvider router={appRouter} />
    </AuthProvider>
);
