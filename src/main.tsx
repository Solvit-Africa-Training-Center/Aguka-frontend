// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "remixicon/fonts/remixicon.css";
import { Provider } from "react-redux";
import { store } from "./services/store/store"; // ✅ no .tsx extension needed
import App from "./App";
import { UserProvider } from "context/UserContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>
);
