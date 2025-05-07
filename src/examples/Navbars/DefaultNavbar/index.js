import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  InputBase,
  IconButton,
  Box,
  Slide,
  Paper,
  useMediaQuery,
  useTheme,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

// MUI components
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKButton from "components/MKButton";

function DefaultNavbar({ brand, transparent, light, sticky, relative, onChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [localSearchValue, setLocalSearchValue] = React.useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Extract search value from URL on component mount and when URL changes
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get("search") || "";
    setLocalSearchValue(searchFromUrl);

    // Call the parent's onChange if the search term exists in the URL
    if (onChange) {
      // Create a synthetic event to mimic input onChange
      const event = { target: { value: searchFromUrl } };
      onChange(event);
    }
  }, [location.search, onChange]);

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setLocalSearchValue(newValue);

    // Call the parent's onChange handler
    if (onChange) {
      onChange(event);
    }

    // Update URL with search parameter while preserving other params like page
    const searchParams = new URLSearchParams(location.search);

    if (newValue) {
      searchParams.set("search", newValue);
      // Reset to page 1 when changing search
      searchParams.set("page", "1");
    } else {
      searchParams.delete("search");
      // Reset to page 1 when clearing search
      searchParams.set("page", "1");
    }

    // Update the URL without causing a page reload
    const newUrl = `${location.pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    navigate(newUrl, { replace: true });
  };

  const clearSearch = () => {
    setLocalSearchValue("");

    // Call parent's onChange with empty value
    if (onChange) {
      onChange({ target: { value: "" } });
    }

    // Remove search param from URL but preserve other params
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("search");
    // Reset to page 1 when clearing search
    searchParams.set("page", "1");

    const newUrl = `${location.pathname}${
      searchParams.toString() ? `?${searchParams.toString()}` : ""
    }`;
    navigate(newUrl, { replace: true });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // Optionally trigger a search action on Enter press
      event.preventDefault();
    }
  };

  return (
    <Container sx={sticky ? { position: "sticky", top: 0, zIndex: 10 } : null}>
      <MKBox
        py={2.5} // Increased vertical padding
        px={{ xs: 2, sm: transparent ? 2 : 3, lg: transparent ? 0 : 3 }}
        my={relative ? 0 : 3} // Increased margin
        mx={relative ? 0 : 3}
        width={relative ? "100%" : "calc(100% - 48px)"}
        borderRadius="xl"
        shadow={transparent ? "none" : "lg"} // Increased shadow
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        sx={({
          palette: { transparent: transparentColor, white, primary },
          functions: { rgba },
        }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.85),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
          borderBottom: `1px solid ${rgba(primary.main, 0.1)}`, // Subtle border
          transition: "all 0.3s ease-in-out",
          "&:hover": {
            boxShadow: transparent ? "none" : theme.shadows[4],
          },
        })}
      >
        <MKBox display="flex" justifyContent="space-between" alignItems="center">
          {/* Brand Logo and Name */}
          <MKBox
            component={Link}
            to="/"
            lineHeight={1}
            py={transparent ? 1.5 : 0.75}
            pl={relative || transparent ? 0 : { xs: 0, lg: 1 }}
            display="flex"
            alignItems="center"
            sx={{ textDecoration: "none" }}
          >
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 45,
                height: 45,
                mr: 1.5,
                boxShadow: "0 3px 10px rgba(0,0,0,0.15)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <MovieFilterIcon />
            </Avatar>
            <Box>
              <MKTypography
                variant="h5"
                fontWeight="bold"
                color={light ? "white" : "dark"}
                sx={{
                  fontSize: { xs: "1.25rem", md: "1.5rem" },
                  letterSpacing: "-0.5px",
                }}
              >
                {brand}
              </MKTypography>
              <MKTypography
                variant="caption"
                fontWeight="regular"
                color={light ? "white" : "text.secondary"}
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Your Anime Encyclopedia
              </MKTypography>
            </Box>
          </MKBox>

          {/* Search Bar */}
          <MKBox ml={{ xs: "auto", lg: 0 }} display="flex" alignItems="center">
            <Paper
              elevation={isSearchFocused ? 8 : 1}
              sx={{
                display: "flex",
                alignItems: "center",
                width: { xs: "180px", sm: "280px", md: "350px" },
                height: 50,
                px: 2,
                py: 1,
                mx: 2,
                borderRadius: 25, // Pill shaped
                transition: "all 0.3s ease",
                backgroundColor: isSearchFocused ? "#ffffff" : theme.palette.grey[100],
                border: isSearchFocused
                  ? `2px solid ${theme.palette.primary.main}`
                  : "1px solid rgba(0,0,0,0.08)",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                },
              }}
            >
              <IconButton
                sx={{
                  p: "8px",
                  color: isSearchFocused ? theme.palette.primary.main : "action.active",
                }}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: "1rem",
                  fontWeight: 500,
                  "& .MuiInputBase-input": {
                    padding: "8px 0",
                  },
                }}
                placeholder={isMobile ? "Search anime..." : "Discover your next favorite anime..."}
                inputProps={{ "aria-label": "search anime" }}
                value={localSearchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <Slide direction="left" in={!!localSearchValue} mountOnEnter unmountOnExit>
                <IconButton
                  sx={{
                    p: "6px",
                    color: theme.palette.grey[500],
                    "&:hover": {
                      color: theme.palette.error.main,
                      backgroundColor: theme.palette.grey[100],
                    },
                  }}
                  aria-label="clear search"
                  onClick={clearSearch}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Slide>
            </Paper>

            {/* Optional: Add a search button for mobile */}
            {isMobile && (
              <MKButton
                variant="gradient"
                color="primary"
                size="small"
                sx={{ display: { xs: "none", sm: "flex" } }}
              >
                Search
              </MKButton>
            )}
          </MKBox>
        </MKBox>
      </MKBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: "AnimeHub",
  transparent: false,
  light: false,
  action: false,
  sticky: false,
  relative: false,
  center: false,
  onChange: () => {},
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  brand: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.shape),
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  sticky: PropTypes.bool,
  relative: PropTypes.bool,
  center: PropTypes.bool,
  onChange: PropTypes.func,
};

export default DefaultNavbar;
