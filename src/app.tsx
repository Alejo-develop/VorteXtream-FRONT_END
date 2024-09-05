import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/public/landingPage/landing.page'
import RegisterPage from './pages/public/registerPage/register.page'

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
])