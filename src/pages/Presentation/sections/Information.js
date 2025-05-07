// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Anime React components
import MKBox from "components/MKBox";

// Anime React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" pt={6} mt={6}>
      <Container>
        <Grid container item xs={12} spacing={10} alignItems="center" sx={{ mx: "auto" }}>
          {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((e) => (
            <RotatingCard key={e}>
              <RotatingCardFront
                image={bgFront}
                // icon="touch_app"
                title={
                  <>
                    Feel the
                    <br />
                    Material Kit
                  </>
                }
                description="All the MUI components that you need in a development have been re-design with the new look."
              />
              <RotatingCardBack
                image={bgBack}
                title="Discover More"
                description="You will save a lot of time going from prototyping to full-functional code because all elements are implemented."
                action={{
                  type: "internal",
                  route: "/sections/page-sections/page-headers",
                  label: "start with header",
                }}
              />
            </RotatingCard>
          ))}
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
