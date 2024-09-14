import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { appRouter } from "./app";
import "./global.css";
import { AuthProvider } from "./auth/auth.provider";
import BotpressChat from "./common/components/botChat/Bot.component";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={appRouter} />
      <BotpressChat />
    </AuthProvider>
  </StrictMode>
);
