import { useEffect } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Tanstack
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// AnimeHub themes
import theme from "assets/theme";
import Anime from "layouts/pages/anime";
import AnimeDetailPage from "layouts/pages/anime/detail";

const queryClient = new QueryClient();

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Anime />} />
          <Route path="/anime/:id" element={<AnimeDetailPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
