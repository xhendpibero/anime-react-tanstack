import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

// AnimeHub components
import MKBox from "components/MKBox";
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information({ animeList, isLoading, error }) {
  if (isLoading) {
    return (
      <MKBox component="section" pt={6} mt={6} textAlign="center">
        <CircularProgress color="info" />
      </MKBox>
    );
  }

  if (error) {
    return (
      <MKBox component="section" pt={6} mt={6}>
        <Container>
          <Alert severity="error">
            {error.message || "An error occurred while fetching anime data."}
          </Alert>
        </Container>
      </MKBox>
    );
  }

  if (!animeList || animeList.length === 0) {
    return (
      <MKBox component="section" pt={6} mt={6}>
        <Container>
          <Alert severity="info">No anime found. Try a different search term or page.</Alert>
        </Container>
      </MKBox>
    );
  }

  return (
    <MKBox component="section" pt={6} mt={6}>
      <Container maxWidth="false">
        <Grid container spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          {animeList.map((anime, zIndex) => (
            <Grid item key={anime.mal_id + zIndex + anime.rank}>
              <RotatingCard>
                <RotatingCardFront
                  image={anime.images?.jpg?.image_url || bgFront}
                  title={
                    <>
                      {anime.title}
                      {anime.title_english && anime.title_english !== anime.title ? (
                        <small style={{ display: "block", fontSize: "0.75em" }}>
                          {anime.title_english}
                        </small>
                      ) : null}
                    </>
                  }
                  description={`${anime.type || "Unknown type"} • ${
                    anime.episodes ? `${anime.episodes} eps` : "Unknown eps"
                  } • ${anime.rating || "No rating"}`}
                />
                <RotatingCardBack
                  image={
                    anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || bgBack
                  }
                  title="View Details"
                  description={
                    anime.synopsis
                      ? anime.synopsis.length > 150
                        ? `${anime.synopsis.substring(0, 150)}...`
                        : anime.synopsis
                      : "No description available."
                  }
                  action={{
                    type: "internal",
                    route: `/anime/${anime.mal_id}`,
                    label: "See Details",
                    component: Link,
                  }}
                />
              </RotatingCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

// PropTypes
Information.propTypes = {
  animeList: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.instanceOf(Error)]),
};

// DefaultProps for optional props
Information.defaultProps = {
  animeList: [],
  isLoading: false,
  error: null,
};
export default Information;
