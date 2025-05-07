import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAnimeDetail } from "services/main.service";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import FavoriteIcon from "@mui/icons-material/Favorite";

// AnimeHub components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";
import footerRoutes from "footer.routes";

function AnimeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showFullSynopsis, setShowFullSynopsis] = useState(false);

  const { data, status, error, isLoading } = useQuery({
    queryKey: ["animeDetail", id],
    queryFn: () => getAnimeDetail(id),
    staleTime: 600000, // 10 minutes
  });

  const anime = data?.data;

  // Calculate the blur amount - more popular anime = less blur for a cool effect
  const blurAmount = anime?.popularity ? Math.max(1, 10 - anime.popularity / 1000) : 5;

  // Go back to previous page
  const handleGoBack = () => {
    navigate(-1);
  };

  if (status === "loading" || isLoading) {
    return (
      <MKBox display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress color="info" size={60} />
      </MKBox>
    );
  }

  if (status === "error") {
    return (
      <MKBox
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        minHeight="100vh"
        p={3}
      >
        <MKTypography variant="h4" color="error" mb={2}>
          Error loading anime details
        </MKTypography>
        <MKTypography variant="body1" color="text" mb={4}>
          {error?.message || "Unknown error occurred. Please try again."}
        </MKTypography>
        <MKButton color="info" onClick={handleGoBack}>
          Go Back
        </MKButton>
      </MKBox>
    );
  }

  return (
    <>
      <DefaultNavbar sticky brand="Anime Search" />

      <MKBox
        component="header"
        position="relative"
        minHeight="85vh"
        sx={{
          backgroundImage: ({ palette: { gradients }, functions: { linearGradient, rgba } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.75),
              rgba(gradients.dark.state, 0.85)
            )}, url(${
              anime?.images?.jpg?.large_image_url || anime?.images?.webp?.large_image_url
            })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backdropFilter: `blur(${blurAmount}px)`,
            zIndex: 0,
          },
        }}
      >
        {/* Main content */}
        <Container sx={{ position: "relative", zIndex: 2, height: "100%" }}>
          <Grid container spacing={4} minHeight="85vh" alignItems="center">
            <MKBox position="absolute" top={{ xs: "14rem" }} left={{ xs: "1.4rem" }} zIndex={3}>
              <MKButton
                variant="gradient"
                color="white"
                circular
                onClick={handleGoBack}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: { xs: "10px", md: "12px" },
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                  backgroundColor: "rgba(255,255,255,0.9)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  transition: "all 0.3s ease",
                  overflow: "hidden",
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: "0 12px 28px rgba(0,0,0,0.25)",
                    backgroundColor: "rgba(255,255,255,1)",
                    "& .back-text": {
                      maxWidth: "100px",
                      opacity: 1,
                      marginLeft: "8px",
                    },
                  },
                  "&:active": {
                    transform: "translateY(-1px)",
                    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                  },
                }}
              >
                <ArrowBackIcon
                  sx={{
                    fontSize: { xs: "1.5rem", md: "1.8rem" },
                    color: "#555",
                    transition: "transform 0.2s ease",
                    ".MuiButton-root:hover &": {
                      transform: "translateX(-2px)",
                    },
                  }}
                />
                <MKTypography
                  variant="button"
                  fontWeight="medium"
                  className="back-text"
                  sx={{
                    maxWidth: { xs: "0", md: "0" },
                    opacity: { xs: 0, md: 0 },
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    transition: "all 0.3s ease",
                    color: "#555",
                  }}
                >
                  Go Back
                </MKTypography>
              </MKButton>
            </MKBox>
            {/* Anime poster */}
            <Grid item xs={12} md={4} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                component="img"
                src={anime?.images?.jpg?.image_url}
                alt={anime?.title}
                sx={{
                  width: "100%",
                  maxWidth: { xs: "220px", md: "100%" },
                  borderRadius: "16px",
                  boxShadow: "0 24px 48px rgba(0, 0, 0, 0.4)",
                  transform: { md: "scale(1.05)" },
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: { md: "scale(1.08)" },
                  },
                }}
              />
            </Grid>

            {/* Anime info */}
            <Grid item xs={12} md={8} lg={9}>
              <Stack spacing={3}>
                {/* Title section */}
                <Box>
                  <MKTypography
                    variant="h1"
                    color="white"
                    sx={({ breakpoints, typography: { size } }) => ({
                      [breakpoints.down("md")]: {
                        fontSize: size["3xl"],
                      },
                      textShadow: "0 4px 8px rgba(0,0,0,0.5)",
                      fontWeight: "bold",
                    })}
                  >
                    {anime?.title}
                  </MKTypography>

                  {anime?.title_english && anime.title_english !== anime.title && (
                    <MKTypography
                      variant="h4"
                      color="white"
                      opacity={0.8}
                      mt={1}
                      sx={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                    >
                      {anime.title_english}
                    </MKTypography>
                  )}

                  {anime?.title_japanese && (
                    <MKTypography variant="body1" color="white" opacity={0.6} mt={1}>
                      {anime.title_japanese}
                    </MKTypography>
                  )}
                </Box>

                {/* Quick stats */}
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  divider={
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        display: { xs: "none", sm: "block" },
                        borderColor: "rgba(255,255,255,0.2)",
                      }}
                    />
                  }
                >
                  {/* Rating & Score */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Rating
                      value={anime?.score ? anime.score / 2 : 0}
                      readOnly
                      precision={0.1}
                      icon={<StarIcon fontSize="inherit" sx={{ color: "#FFD700" }} />}
                      emptyIcon={
                        <StarIcon fontSize="inherit" sx={{ color: "rgba(255,255,255,0.3)" }} />
                      }
                    />
                    <MKTypography variant="h5" color="white" ml={1}>
                      {anime?.score || "N/A"}/10
                    </MKTypography>
                  </Box>

                  {/* Type & Episodes */}
                  <Box>
                    <MKTypography variant="body1" color="white" opacity={0.7}>
                      {anime?.type || "Unknown"} •{" "}
                      {anime?.episodes ? `${anime.episodes} episodes` : "? episodes"}
                    </MKTypography>
                  </Box>

                  {/* Year & Status */}
                  <Box>
                    <MKTypography variant="body1" color="white" opacity={0.7}>
                      {anime?.year || "?"} • {anime?.status || "Unknown status"}
                    </MKTypography>
                  </Box>
                </Stack>

                {/* Genres */}
                {anime?.genres && anime.genres.length > 0 && (
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {anime.genres.map((genre) => (
                      <Chip
                        key={genre.mal_id}
                        label={genre.name}
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.15)",
                          color: "white",
                          mb: 1,
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.25)",
                          },
                        }}
                      />
                    ))}
                  </Stack>
                )}

                {/* Synopsis - truncated with "Read more" option */}
                <Box>
                  <MKTypography
                    variant="body1"
                    color="white"
                    opacity={0.9}
                    sx={{
                      lineHeight: 1.7,
                      textShadow: "0 1px 2px rgba(0,0,0,0.3)",
                    }}
                  >
                    {anime?.synopsis
                      ? showFullSynopsis
                        ? anime.synopsis
                        : `${anime.synopsis.substring(0, 300)}${
                            anime.synopsis.length > 300 ? "..." : ""
                          }`
                      : "No synopsis available."}
                  </MKTypography>

                  {anime?.synopsis && anime.synopsis.length > 300 && (
                    <MKButton
                      variant="text"
                      color="white"
                      size="small"
                      onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                      sx={{ mt: 1 }}
                    >
                      {showFullSynopsis ? "Show less" : "Read more"}
                    </MKButton>
                  )}
                </Box>

                {/* Action buttons */}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mt={2}>
                  {anime?.trailer?.url && (
                    <MKButton
                      variant="gradient"
                      color="info"
                      startIcon={<PlayArrowIcon />}
                      component="a"
                      href={anime.trailer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Trailer
                    </MKButton>
                  )}

                  {anime?.url && (
                    <MKButton
                      variant="outlined"
                      color="white"
                      component="a"
                      href={anime.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      MyAnimeList
                    </MKButton>
                  )}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </MKBox>

      {/* Additional details section */}
      <MKBox component="section" py={6}>
        <Container>
          <Grid container spacing={4}>
            {/* Left column - Stats and details */}
            <Grid item xs={12} md={4}>
              <MKBox
                p={3}
                borderRadius="xl"
                shadow="lg"
                sx={{ backgroundColor: ({ palette }) => palette.grey[100] }}
              >
                <Stack spacing={3}>
                  <MKTypography variant="h4" color="info">
                    Details
                  </MKTypography>

                  <Divider />

                  {/* Stats using flex box instead of Grid */}
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 3,
                      margin: 0, // Ensure no margin interferes with layout
                    }}
                  >
                    {/* Score */}
                    <Box
                      sx={{
                        width: "calc(50% - 12px)", // 50% width minus half the gap
                        minWidth: "140px",
                        flexGrow: 1,
                      }}
                    >
                      <MKBox
                        p={2}
                        textAlign="center"
                        borderRadius="lg"
                        sx={{
                          backgroundColor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          height: "100%",
                        }}
                      >
                        <StarIcon color="warning" sx={{ width: 48, height: 48 }} />
                        <MKTypography variant="h3" color="text" mt={1} fontWeight="bold">
                          {anime?.score || "N/A"}
                        </MKTypography>
                        <MKTypography variant="button" color="text" opacity={0.7}>
                          SCORE
                        </MKTypography>
                      </MKBox>
                    </Box>

                    {/* Rank */}
                    <Box
                      sx={{
                        width: "calc(50% - 12px)", // 50% width minus half the gap
                        minWidth: "140px",
                        flexGrow: 1,
                      }}
                    >
                      <MKBox
                        p={2}
                        textAlign="center"
                        borderRadius="lg"
                        sx={{
                          backgroundColor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          height: "100%",
                        }}
                      >
                        <Box
                          component="span"
                          sx={{ fontSize: 42, fontWeight: "bold", color: "#673ab7" }}
                        >
                          #
                        </Box>
                        <MKTypography variant="h3" color="text" mt={1} fontWeight="bold">
                          {anime?.rank || "N/A"}
                        </MKTypography>
                        <MKTypography variant="button" color="text" opacity={0.7}>
                          RANK
                        </MKTypography>
                      </MKBox>
                    </Box>

                    {/* Popularity */}
                    <Box
                      sx={{
                        width: "calc(50% - 12px)", // 50% width minus half the gap
                        minWidth: "140px",
                        flexGrow: 1,
                      }}
                    >
                      <MKBox
                        p={2}
                        textAlign="center"
                        borderRadius="lg"
                        sx={{
                          backgroundColor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          height: "100%",
                        }}
                      >
                        <FavoriteIcon color="error" sx={{ width: 48, height: 48 }} />
                        <MKTypography variant="h3" color="text" mt={1} fontWeight="bold">
                          {anime?.popularity ? `#${anime.popularity}` : "N/A"}
                        </MKTypography>
                        <MKTypography variant="button" color="text" opacity={0.7}>
                          POPULARITY
                        </MKTypography>
                      </MKBox>
                    </Box>

                    {/* Members */}
                    <Box
                      sx={{
                        width: "calc(50% - 12px)", // 50% width minus half the gap
                        minWidth: "140px",
                        flexGrow: 1,
                      }}
                    >
                      <MKBox
                        p={2}
                        textAlign="center"
                        borderRadius="lg"
                        sx={{
                          backgroundColor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                          height: "100%",
                        }}
                      >
                        <Box component="span" sx={{ fontSize: 32, color: "#2196f3" }}>
                          <i className="fas fa-users"></i>
                        </Box>
                        <MKTypography variant="h3" color="text" mt={1} fontWeight="bold">
                          {anime?.members
                            ? anime.members > 999999
                              ? `${(anime.members / 1000000).toFixed(1)}M`
                              : anime.members > 999
                              ? `${(anime.members / 1000).toFixed(1)}K`
                              : anime.members
                            : "N/A"}
                        </MKTypography>
                        <MKTypography variant="button" color="text" opacity={0.7}>
                          MEMBERS
                        </MKTypography>
                      </MKBox>
                    </Box>
                  </Box>

                  <Divider />

                  {/* Detailed information */}
                  <Stack spacing={2}>
                    {/* Japanese title */}
                    {anime?.title_japanese && (
                      <Box>
                        <MKTypography variant="button" fontWeight="bold" color="text">
                          JAPANESE TITLE
                        </MKTypography>
                        <MKTypography variant="body2" color="text">
                          {anime.title_japanese}
                        </MKTypography>
                      </Box>
                    )}

                    {/* Type */}
                    <Box>
                      <MKTypography variant="button" fontWeight="bold" color="text">
                        TYPE
                      </MKTypography>
                      <MKTypography variant="body2" color="text">
                        {anime?.type || "Unknown"}
                      </MKTypography>
                    </Box>

                    {/* Episodes */}
                    <Box>
                      <MKTypography variant="button" fontWeight="bold" color="text">
                        EPISODES
                      </MKTypography>
                      <MKTypography variant="body2" color="text">
                        {anime?.episodes || "Unknown"}
                      </MKTypography>
                    </Box>

                    {/* Status */}
                    <Box>
                      <MKTypography variant="button" fontWeight="bold" color="text">
                        STATUS
                      </MKTypography>
                      <MKTypography variant="body2" color="text">
                        {anime?.status || "Unknown"}
                      </MKTypography>
                    </Box>

                    {/* Aired */}
                    {anime?.aired && (
                      <Box>
                        <MKTypography variant="button" fontWeight="bold" color="text">
                          AIRED
                        </MKTypography>
                        <MKTypography variant="body2" color="text">
                          {anime.aired.string ||
                            (anime.aired.from
                              ? new Date(anime.aired.from).toLocaleDateString()
                              : "Unknown")}
                        </MKTypography>
                      </Box>
                    )}

                    {/* Duration */}
                    {anime?.duration && (
                      <Box>
                        <MKTypography variant="button" fontWeight="bold" color="text">
                          DURATION
                        </MKTypography>
                        <MKTypography variant="body2" color="text">
                          {anime.duration}
                        </MKTypography>
                      </Box>
                    )}

                    {/* Rating */}
                    {anime?.rating && (
                      <Box>
                        <MKTypography variant="button" fontWeight="bold" color="text">
                          RATING
                        </MKTypography>
                        <MKTypography variant="body2" color="text">
                          {anime.rating}
                        </MKTypography>
                      </Box>
                    )}

                    {/* Source */}
                    {anime?.source && (
                      <Box>
                        <MKTypography variant="button" fontWeight="bold" color="text">
                          SOURCE
                        </MKTypography>
                        <MKTypography variant="body2" color="text">
                          {anime.source}
                        </MKTypography>
                      </Box>
                    )}
                  </Stack>
                </Stack>
              </MKBox>
            </Grid>

            {/* Right column - Trailer, Studios, additional content */}
            <Grid item xs={12} md={8}>
              <Stack spacing={4}>
                {/* Trailer section (if available) */}
                {anime?.trailer?.embed_url && (
                  <MKBox borderRadius="xl" overflow="hidden" shadow="lg">
                    <MKTypography variant="h4" color="dark" p={3} pb={0}>
                      Trailer
                    </MKTypography>
                    <MKBox
                      component="iframe"
                      src={anime.trailer.embed_url}
                      title={`${anime.title} trailer`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      sx={{
                        width: "100%",
                        height: { xs: "240px", md: "380px" },
                        padding: 3,
                        pt: 1,
                      }}
                    />
                  </MKBox>
                )}

                {/* Studios & producers section */}
                {(anime?.studios?.length > 0 || anime?.producers?.length > 0) && (
                  <MKBox
                    p={3}
                    borderRadius="xl"
                    shadow="lg"
                    sx={{ backgroundColor: ({ palette }) => palette.grey[100] }}
                  >
                    <Stack spacing={3}>
                      {/* Studios */}
                      {anime?.studios?.length > 0 && (
                        <Box>
                          <MKTypography variant="h5" color="info" mb={2}>
                            Studios
                          </MKTypography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {anime.studios.map((studio) => (
                              <Chip
                                key={studio.mal_id}
                                label={studio.name}
                                sx={{
                                  backgroundColor: "white",
                                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                  mb: 1,
                                  "&:hover": {
                                    backgroundColor: ({ palette }) => palette.grey[200],
                                  },
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}

                      {/* Producers */}
                      {anime?.producers?.length > 0 && (
                        <Box>
                          <MKTypography variant="h5" color="info" mb={2}>
                            Producers
                          </MKTypography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {anime.producers.map((producer) => (
                              <Chip
                                key={producer.mal_id}
                                label={producer.name}
                                sx={{
                                  backgroundColor: "white",
                                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                  mb: 1,
                                  "&:hover": {
                                    backgroundColor: ({ palette }) => palette.grey[200],
                                  },
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      )}
                    </Stack>
                  </MKBox>
                )}

                {/* Background info card (if available) */}
                {anime?.background && (
                  <MKBox
                    p={3}
                    borderRadius="xl"
                    shadow="lg"
                    sx={{ backgroundColor: ({ palette }) => palette.grey[100] }}
                  >
                    <MKTypography variant="h4" color="info" mb={3}>
                      Background
                    </MKTypography>
                    <MKTypography variant="body2" color="text">
                      {anime.background}
                    </MKTypography>
                  </MKBox>
                )}

                {/* Themes section */}
                {(anime?.themes?.length > 0 || anime?.demographics?.length > 0) && (
                  <MKBox
                    p={3}
                    borderRadius="xl"
                    shadow="lg"
                    sx={{ backgroundColor: ({ palette }) => palette.grey[100] }}
                  >
                    <Grid container spacing={3}>
                      {/* Themes */}
                      {anime?.themes?.length > 0 && (
                        <Grid item xs={12} sm={6}>
                          <MKTypography variant="h5" color="info" mb={2}>
                            Themes
                          </MKTypography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {anime.themes.map((theme, index) => (
                              <Chip
                                key={index}
                                label={theme.name}
                                sx={{
                                  backgroundColor: "white",
                                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                  mb: 1,
                                }}
                              />
                            ))}
                          </Stack>
                        </Grid>
                      )}

                      {/* Demographics */}
                      {anime?.demographics?.length > 0 && (
                        <Grid item xs={12} sm={6}>
                          <MKTypography variant="h5" color="info" mb={2}>
                            Demographics
                          </MKTypography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {anime.demographics.map((demo, index) => (
                              <Chip
                                key={index}
                                label={demo.name}
                                sx={{
                                  backgroundColor: "white",
                                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                  mb: 1,
                                }}
                              />
                            ))}
                          </Stack>
                        </Grid>
                      )}
                    </Grid>
                  </MKBox>
                )}

                {/* Relations section */}
                {anime?.relations && anime.relations.length > 0 && (
                  <MKBox
                    p={3}
                    borderRadius="xl"
                    shadow="lg"
                    sx={{ backgroundColor: ({ palette }) => palette.grey[100] }}
                  >
                    <MKTypography variant="h4" color="info" mb={3}>
                      Related Content
                    </MKTypography>
                    <Stack spacing={2}>
                      {anime.relations.map((relation, index) => (
                        <Box key={index}>
                          <MKTypography variant="button" fontWeight="bold" color="text">
                            {relation.relation}
                          </MKTypography>
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap mt={1}>
                            {relation.entry.map((entry, entryIndex) => (
                              <Chip
                                key={entryIndex}
                                label={entry.name}
                                component={entry.type === "anime" ? Link : "div"}
                                to={entry.type === "anime" ? `/anime/${entry.mal_id}` : undefined}
                                clickable={entry.type === "anime"}
                                sx={{
                                  backgroundColor: "white",
                                  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
                                  mb: 1,
                                  "&:hover": {
                                    backgroundColor: ({ palette }) =>
                                      entry.type === "anime" ? palette.primary.lighter : undefined,
                                  },
                                }}
                              />
                            ))}
                          </Stack>
                        </Box>
                      ))}
                    </Stack>
                  </MKBox>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </MKBox>

      <Container>
        <MKBox textAlign="center" mb={6}>
          <MKButton
            variant="gradient"
            color="info"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
          >
            Back to search results
          </MKButton>
        </MKBox>
      </Container>

      <DefaultFooter content={footerRoutes} />
    </>
  );
}

export default AnimeDetail;
