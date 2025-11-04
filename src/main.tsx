import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/theme.tsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              success:
                "!border-green-200 !bg-green-50 !text-green-800 [&_svg]:!text-green-600 [&>*>_svg]:!text-green-600",
              error:
                "!border-red-200 !bg-red-50 !text-red-800 [&_svg]:!text-red-600 [&>*>_svg]:!text-red-600",
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
