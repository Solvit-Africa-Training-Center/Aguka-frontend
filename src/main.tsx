// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { Provider } from "react-redux";
<<<<<<< HEAD
import { store } from "./store";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
     <Provider store={store}>
    <App />
=======
import { store } from "./services/store/store"; // ✅ no .tsx extension needed
import App from "./App";
import { UserProvider } from "context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
>>>>>>> a2d6b72c08253f6f5cb5a67b019bc5a47f9fefeb
    </Provider>
  </StrictMode>
);
