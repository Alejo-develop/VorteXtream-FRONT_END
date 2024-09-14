import { createBrowserRouter } from 'react-router-dom'
import LandingPage from './pages/public/landingPage/landing.page'
import RegisterPage from './pages/public/registerPage/register.page'
import { NavBarLayout } from './layouts/NavBar.Layout'
import SearchPage from './pages/public/searchPage/search.Page'
import FooterComponent from './common/components/footer/footer.component'
import SearchStreamsPage from './pages/public/searchStreamsPage/SearchStreamsPage'
import LayoutStreamers from './layouts/layoutStreamers/layoutStreamers'
import { AnimePage } from './pages/public/animePage/anime.page'
import { ProtectedRoute } from './auth/portectedRoutes.auth'
import UserMenuPage from './pages/private/userMenu/userMenu.page'
import FavoritesHistoryPage from './pages/private/favoritesHistory/favoriteHistory.page'
import MediaPlayerPage from './pages/private/mediaPlayer/mediaPlayer.page'
import StreamPage from './pages/private/streamPlayer/streamPlayer.page'
import StreamerUserPage from './pages/private/streamUserPlayer/streamerUser.page'


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
    path: "/singup",
    element: <RegisterPage isRegister />,
  },
  {
    path: "/login",
    element: <RegisterPage />,
  },
  {
    path: "/searchpage",
    element: (
      <NavBarLayout>
        <SearchPage />
      </NavBarLayout>
    ),
  },
  {
    path: "/streams",
    element: (
      <NavBarLayout>
        <LayoutStreamers>
          <SearchStreamsPage />
        </LayoutStreamers>
      </NavBarLayout>
    ),
  },
  {
    path: "/animes",
    element: (
      <NavBarLayout>
        <AnimePage />
      </NavBarLayout>
    ),
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/usermenu",

        element: (
          <NavBarLayout>
            <UserMenuPage />
          </NavBarLayout>
        ),
      },
      {
        path: "history&favorites",
        element: (
          <NavBarLayout>
            <FavoritesHistoryPage />
          </NavBarLayout>
        ),
      },
      {
        path: "watch",
        element: <MediaPlayerPage />,
      },
      {
        path: "watchstream",
        element: <StreamPage />,
      },
      {
        path: "mystream",
        element: (
          <NavBarLayout>
            <StreamerUserPage />
          </NavBarLayout>
        ),
      },
    ],
  },
]);
