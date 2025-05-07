import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { InputBase, IconButton, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

// MUI components
import Container from "@mui/material/Container";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function DefaultNavbar({ brand, transparent, light, sticky, relative, onChange }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [localSearchValue, setLocalSearchValue] = React.useState("");

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
        py={1}
        px={{ xs: 4, sm: transparent ? 2 : 3, lg: transparent ? 0 : 2 }}
        my={relative ? 0 : 2}
        mx={relative ? 0 : 3}
        width={relative ? "100%" : "calc(100% - 48px)"}
        borderRadius="xl"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        position={relative ? "relative" : "absolute"}
        left={0}
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <MKBox display="flex" justifyContent="space-between" alignItems="center">
          <MKBox
            component={Link}
            to="/"
            lineHeight={1}
            py={transparent ? 1.5 : 0.75}
            pl={relative || transparent ? 0 : { xs: 0, lg: 1 }}
          >
            <MKTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
              {brand}
            </MKTypography>
          </MKBox>
          <MKBox ml={{ xs: "auto", lg: 0 }} display="flex" alignItems="center">
            <Box
              sx={{
                position: "relative",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "xl",
                backgroundColor: (theme) => theme.palette.grey[100],
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.grey[200],
                },
                width: { xs: "180px", sm: "250px", md: "300px" },
                mx: 2,
              }}
            >
              <IconButton sx={{ p: "10px", position: "absolute", left: 0 }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <InputBase
                sx={{
                  ml: 5,
                  flex: 1,
                  fontSize: "0.875rem",
                  width: "calc(100% - 80px)",
                }}
                placeholder="Search for anime..."
                inputProps={{ "aria-label": "search anime" }}
                value={localSearchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
              />
              {localSearchValue && (
                <IconButton
                  sx={{
                    p: "5px",
                    position: "absolute",
                    right: 5,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                  aria-label="clear search"
                  onClick={clearSearch}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </MKBox>
        </MKBox>
      </MKBox>
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  brand: "Anime",
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
