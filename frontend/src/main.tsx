// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.tsx";
import store from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthToken } from "./components";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <Provider store={store}>
    <ToastContainer />
    <AuthToken>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthToken>
  </Provider>
  // </StrictMode>
);
