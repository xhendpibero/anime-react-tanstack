/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { keepPreviousData, useQuery, useQueryClient } from "@tanstack/react-query";
import { getListAnime } from "services/main.service";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Skeleton from "@mui/material/Skeleton";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SearchOffIcon from "@mui/icons-material/SearchOff";

// AnimeHub components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

// AnimeHub components
import DefaultNavbar from "components/Navbars/DefaultNavbar";
import DefaultFooter from "components/Footers/DefaultFooter";

// Anime page sections
import Information from "pages/Anime/sections/Information";
import PaginationSection from "pages/Anime/sections/Pagination";

// Routes
import footerRoutes from "footer.routes";

// Images
import bgImage from "assets/images/bg-anime.jpg";

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <Grid container spacing={3} sx={{ mt: 3 }}>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} lg={3} key={index}>
        <Card sx={{ borderRadius: 2, overflow: "hidden", boxShadow: 3 }}>
          <Skeleton variant="rectangular" height={200} animation="wave" />
          <Box sx={{ p: 2 }}>
            <Skeleton variant="text" height={30} width="80%" animation="wave" />
            <Skeleton variant="text" height={20} width="60%" animation="wave" />
            <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
              <Skeleton variant="rounded" height={30} width="40%" animation="wave" />
              <Skeleton variant="circular" height={30} width={30} animation="wave" />
            </Box>
          </Box>
        </Card>
      </Grid>
    ))}
  </Grid>
);

// Empty State Component
const EmptyState = ({ searchQuery, onReset }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      py: 8,
    }}
  >
    {searchQuery ? (
      <>
        <SearchOffIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        <MKTypography variant="h4" gutterBottom>
          No results found
        </MKTypography>
        <MKTypography variant="body1" color="text.secondary" textAlign="center" mb={3}>
          We couldn't find any anime matching "{searchQuery}"
        </MKTypography>
        <MKButton variant="gradient" color="info" onClick={onReset}>
          Clear Search
        </MKButton>
      </>
    ) : (
      <>
        <SentimentDissatisfiedIcon sx={{ fontSize: 80, color: "text.secondary", mb: 2 }} />
        <MKTypography variant="h4" gutterBottom>
          No anime available
        </MKTypography>
        <MKTypography variant="body1" color="text.secondary" textAlign="center">
          There seems to be no anime data available at the moment.
        </MKTypography>
      </>
    )}
  </Box>
);

// Error State Component
const ErrorState = ({ error, onRetry }) => (
  <Alert
    severity="error"
    variant="filled"
    sx={{
      my: 4,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      py: 3,
    }}
    action={
      <MKButton variant="text" color="white" onClick={onRetry} sx={{ mt: 2 }}>
        Try Again
      </MKButton>
    }
  >
    <MKTypography variant="h6" color="white" gutterBottom>
      Something went wrong
    </MKTypography>
    <MKTypography variant="body2" color="white" textAlign="center">
      {error?.message || "Failed to load anime data. Please try again."}
    </MKTypography>
  </Alert>
);

// Main Loading Animation Component
const LoadingAnimation = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "50vh",
      flexDirection: "column",
    }}
  >
    <CircularProgress size={60} thickness={4} color="info" />
    <MKTypography variant="h6" color="text.secondary" mt={3}>
      Loading awesome anime...
    </MKTypography>
  </Box>
);

function Anime() {
  const location = useLocation();
  const queryClient = useQueryClient();
  const [page, setPage] = React.useState(1);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Initialize from URL on component mount and when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Get search from URL
    const searchFromUrl = searchParams.get("search") || "";
    if (searchFromUrl !== searchQuery) {
      setSearchQuery(searchFromUrl);
    }

    // Get page from URL
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
    if (!isNaN(pageFromUrl) && pageFromUrl !== page) {
      setPage(pageFromUrl);
    }
  }, [location.search]);

  // Handle search input with debounce
  const debouncedSearchQuery = useDebounce(searchQuery, 250);

  const { status, data, error, refetch, isLoading } = useQuery({
    queryKey: ["animeList", page, debouncedSearchQuery],
    queryFn: () => getListAnime(page, debouncedSearchQuery),
    placeholderData: keepPreviousData,
    staleTime: 5000,
  });

  // Prefetch the next page
  React.useEffect(() => {
    if (data?.pagination?.has_next_page) {
      queryClient.prefetchQuery({
        queryKey: ["animeList", page + 1, debouncedSearchQuery],
        queryFn: () => getListAnime(page + 1, debouncedSearchQuery),
      });
    }
  }, [data, page, debouncedSearchQuery, queryClient]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchQuery("");
    setPage(1);
  };

  // Custom debounce hook
  function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = React.useState(value);

    React.useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  }

  // Determine what to render in the content area
  const renderContent = () => {
    if ((status === "loading" && !data) || isLoading) {
      return <LoadingAnimation />;
    }

    if (status === "error") {
      return <ErrorState error={error} onRetry={refetch} />;
    }

    if (!data?.data || data.data.length === 0) {
      return <EmptyState searchQuery={debouncedSearchQuery} onReset={handleResetSearch} />;
    }

    return (
      <>
        <Information
          animeList={data.data}
          isLoading={status === "loading"}
          error={error}
          LoadingComponent={<LoadingSkeleton />}
        />
        <PaginationSection
          totalPages={data?.pagination?.last_visible_page || 1}
          currentPage={page}
          onPageChange={handlePageChange}
        />
      </>
    );
  };

  return (
    <>
      <DefaultNavbar brand="AnimeHub" sticky value={searchQuery} onChange={handleSearchChange} />
      <MKBox
        minHeight="75vh"
        width="100%"
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          display: "grid",
          placeItems: "center",
        }}
      >
        <Container>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <MKTypography
              variant="h1"
              color="white"
              mt={-6}
              mb={1}
              sx={({ breakpoints, typography: { size } }) => ({
                [breakpoints.down("md")]: {
                  fontSize: size["3xl"],
                },
              })}
            >
              AnimeHub
            </MKTypography>
            <MKTypography
              variant="body1"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={1}
            >
              A modern React application built by Dendy Sapto Adi showcasing proficiency in React,
              Material-UI, RESTful API integration, and responsive design. This portfolio project
              demonstrates the same attention to detail and user experience focus I would bring to
              the development team at YoPrint.
            </MKTypography>
            <MKTypography
              variant="body2"
              color="white"
              textAlign="center"
              px={{ xs: 6, lg: 12 }}
              mt={2}
              opacity={0.8}
            >
              Featuring real-time data fetching, clean component architecture, and performant
              rendering techniques that would translate well to YoPrint's dynamic e-commerce
              environment.
            </MKTypography>
          </Grid>
        </Container>
      </MKBox>
      <Card
        sx={{
          p: 2,
          mx: { xs: 2, lg: 3 },
          mt: -8,
          mb: 4,
          backgroundColor: ({ palette: { white }, functions: { rgba } }) => rgba(white.main, 0.8),
          backdropFilter: "saturate(200%) blur(30px)",
          boxShadow: ({ boxShadows: { xxl } }) => xxl,
        }}
      >
        {renderContent()}
      </Card>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default Anime;
