import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/public/landingPage/landing.page";
import RegisterPage from "./pages/public/registerPage/register.page";
import { NavBarLayout } from "./layouts/NavBar.Layout";
import SearchPage from "./pages/public/searchPage/search.Page";
import FooterComponent from "./common/components/footer/footer.component";
import SearchStreamsPage from "./pages/public/searchStreamsPage/SearchStreamsPage";
import LayoutStreamers from "./layouts/layoutStreamers/layoutStreamers";
import { AnimePage } from "./pages/public/animePage/anime.page";
import { ProtectedRoute } from "./auth/portectedRoutes.auth"; // Correct the path if needed
import UserMenuPage from "./pages/private/userMenu/userMenu.page";
import FavoritesHistoryPage from "./pages/private/favoritesHistory/favoriteHistory.page";
import MediaPlayerPage from "./pages/private/mediaPlayer/mediaPlayer.page";
import StreamPage from "./pages/private/streamPlayer/streamPlayer.page";
import CheckoutPage from "./pages/public/checkoutPage/chekout.page";
import StreamerUserPage from "./pages/private/streamUserPlayer/streamerUser.page";
import { AdminPage } from "./pages/private/adminPage/Admin.page";
import { AdminProtectedRoute } from "./auth/protectAdmin.auth"; // Add this line
import { AdminCrudMovie } from "./pages/private/adminPage/AdminCRUDMovie.page";
import { AdminCrudCastPage } from "./pages/private/adminPage/AdminCRUDCast";
import { AdminCrudCategoriesPage } from "./pages/private/adminPage/AdminCRUDCategories";
import { AdminCrudDirectorsPage } from "./pages/private/adminPage/AdminCRUDirectors";
import TransitionPage from "./common/utils/transitionPage";
import React from "react";
import { PremiumProtectedRoute } from "./auth/protectedRoutesPremium.auth";
import { IsNotPremiumProtectedRoute } from "./auth/isNotPremium.auth";

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
    path: "/signup",
    element: <RegisterPage isRegister />,
  },
  {
    path: "/login",
    element: <RegisterPage />,
  },
  {
    path: "/searchpage",
    element: (
      <React.StrictMode>
        <NavBarLayout>
          <TransitionPage />
          <SearchPage />
        </NavBarLayout>
      </React.StrictMode>
    ),
  },
  {
    path: "/streams",
    element: (
      <React.StrictMode>
        <NavBarLayout>
          <TransitionPage />
          <LayoutStreamers>
            <SearchStreamsPage />
          </LayoutStreamers>
        </NavBarLayout>
      </React.StrictMode>
    ),
  },
  {
    path: "/animes",
    element: (
      <React.StrictMode>
        <NavBarLayout>
          <TransitionPage />
          <AnimePage />
          <FooterComponent />
        </NavBarLayout>
      </React.StrictMode>
    ),
  },

  {
    path: "/adminpage",
    element: <AdminProtectedRoute />,
    children: [
      {
        path: "",
        element: <AdminPage />,
      },
      {
        path: "crudmovie",
        element: <AdminCrudMovie />,
      },
      {
        path: "crudcast",
        element: <AdminCrudCastPage />,
      },
      {
        path: "crudcategories",
        element: <AdminCrudCategoriesPage />,
      },
      {
        path: "crudirectors",
        element: <AdminCrudDirectorsPage />,
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "usermenu",
        element: (
          <NavBarLayout>
            <UserMenuPage />
          </NavBarLayout>
        ),
      },
      {
        path: "/history&favorites",
        element: (
          <React.StrictMode>
            <NavBarLayout>
              <TransitionPage />
              <FavoritesHistoryPage />
              <FooterComponent />
            </NavBarLayout>
          </React.StrictMode>
        ),
      },
      {
        path: "/watch",
        element: <PremiumProtectedRoute />,
        children: [
          {
            path: ":id",
            element: <MediaPlayerPage />,
          },
        ],
      },
      {
        path: "/watchstream/:user_name",
        element: (
          <NavBarLayout>
            <LayoutStreamers>
              <StreamPage />
            </LayoutStreamers>
          </NavBarLayout>
        ),
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
  {
    path: '/',
    element: <IsNotPremiumProtectedRoute />,
    children: [
      {
        path: "/checkout",
        element: (
          <NavBarLayout>
            <CheckoutPage />
          </NavBarLayout>
        ),
      },
    ]
  }
]);
