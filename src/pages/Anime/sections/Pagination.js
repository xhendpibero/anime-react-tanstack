import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

// AnimeHub components
import MKBox from "components/MKBox";

function PaginationSection({ totalPages, currentPage, onPageChange }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Sync component state with URL on mount and URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);

    // If the URL page is different from the component's current page
    if (pageFromUrl !== currentPage && onPageChange && !isNaN(pageFromUrl)) {
      onPageChange(pageFromUrl);
    }
  }, [location.search, currentPage, onPageChange]);

  const handlePageChange = (event, value) => {
    // Update component state via parent callback
    if (onPageChange) {
      onPageChange(value);
    }

    // Update URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("page", value.toString());

    const newUrl = `${location.pathname}?${searchParams.toString()}`;
    navigate(newUrl, { replace: true });

    // Scroll to top
    window.scrollTo(0, 900);
  };

  return (
    <MKBox component="section" py={6} my={1}>
      <Container>
        <Grid container item xs={11} alignItems="center" sx={{ mx: "auto", my: "auto" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="info"
            size="large"
            sx={{ mx: "auto" }}
          />
        </Grid>
      </Container>
    </MKBox>
  );
}

// Setting default props for the PaginationSection
PaginationSection.defaultProps = {
  totalPages: 1,
  currentPage: 1,
  onPageChange: () => {},
};

// Typechecking props for the PaginationSection
PaginationSection.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func,
};

export default PaginationSection;
