// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import { Box } from "@mui/material";

// AnimeHub components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function RotatingCardFront({ color, image, icon, title, description }) {
  return (
    <MKBox
      display="flex"
      justifyContent="center"
      alignContent="center"
      borderRadius="lg"
      coloredShadow={color}
      width="16.2rem"
      height="24rem"
      position="relative"
      zIndex={2}
      sx={{
        backgroundImage: () =>
          `linear-gradient(195deg, rgba(73, 163, 241, 0.2), rgba(26, 32, 53, 0.8)), url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backfaceVisibility: "hidden",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0 15px 30px rgba(0,0,0,0.3)",
        },
      }}
    >
      <MKBox
        py={6}
        px={3}
        textAlign="center"
        lineHeight={1}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        height="100%"
      >
        {icon && (
          <MKTypography
            variant="h2"
            color="white"
            my={2}
            sx={{
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { opacity: 0.8 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0.8 },
              },
            }}
          >
            {typeof icon === "string" ? <Icon>{icon}</Icon> : icon}
          </MKTypography>
        )}

        <Box sx={{ position: "relative", mb: 2 }}>
          <MKTypography
            variant="h3"
            color="white"
            fontWeight="bold"
            textTransform="uppercase"
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              letterSpacing: "1px",
              position: "relative",
              display: "inline-block",
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "normal",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: "auto",
              maxHeight: "5.2em",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "40px",
                height: "3px",
                backgroundColor: "#fff",
                borderRadius: "3px",
              },
            }}
          >
            {typeof title === "string" && title.length > 50
              ? `${title.substring(0, 50)}...`
              : title}
          </MKTypography>
        </Box>

        <MKTypography
          variant="body2"
          color="white"
          sx={{
            textShadow: "0 1px 3px rgba(0,0,0,0.3)",
            lineHeight: 1.5,
            fontWeight: "regular",
            letterSpacing: "0.3px",
            opacity: 0.9,
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {description}
        </MKTypography>

        <Box
          sx={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "80%",
          }}
        >
          <MKTypography
            variant="button"
            color="white"
            sx={{
              opacity: 0.7,
              textTransform: "uppercase",
              letterSpacing: "2px",
              fontSize: "0.7rem",
              pt: 1,
              borderTop: "1px solid rgba(255,255,255,0.3)",
            }}
          >
            View Details
          </MKTypography>
        </Box>
      </MKBox>
    </MKBox>
  );
}

// Setting default props for the RotatingCardFront
RotatingCardFront.defaultProps = {
  color: "info",
  icon: "",
};

// Typechecking props for the RotatingCardFront
RotatingCardFront.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  image: PropTypes.string.isRequired,
  icon: PropTypes.node,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
};

export default RotatingCardFront;
