import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/public/landingPage/landing.page";
import RegisterPage from "./pages/public/registerPage/register.page";
import { NavBarLayout } from "./layouts/NavBar.Layout";

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
    path: "/register",
    element: <RegisterPage />,
  },
]);
