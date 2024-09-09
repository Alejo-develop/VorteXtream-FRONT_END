import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/public/landingPage/landing.page'
import RegisterPage from './pages/public/registerPage/register.page'
import { NavBarLayout } from './layouts/NavBar.Layout'
import SearchPage from './pages/public/searchPage/search.Page'

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavBarLayout>
        <LandingPage />
      </NavBarLayout>
    ),
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/searchpage',
    element: (
      <NavBarLayout>
        <SearchPage />
      </NavBarLayout>
    )
  }
])