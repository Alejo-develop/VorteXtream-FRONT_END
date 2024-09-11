import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/public/landingPage/landing.page'
import RegisterPage from './pages/public/registerPage/register.page'
import { NavBarLayout } from './layouts/NavBar.Layout'
import SearchPage from './pages/public/searchPage/search.Page'
import FooterComponent from './common/components/footer/footer.component'
import SearchStreamsPage from './pages/public/searchStreamsPage/SearchStreamsPage'

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <NavBarLayout>
        <LandingPage />
        <FooterComponent />
      </NavBarLayout>
    ),
  },
  {
    path: '/singup',
    element: <RegisterPage isRegister />
  },
  {
    path: '/login',
    element: <RegisterPage  />
  },
  {
    path: '/searchpage',
    element: (
      <NavBarLayout>
        <SearchPage />
      </NavBarLayout>
    )
  },
  {
    path: '/streams',
    element: (
      <NavBarLayout>
        <SearchStreamsPage />
      </NavBarLayout>
    )
  }
])