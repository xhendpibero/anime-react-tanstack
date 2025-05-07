// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

// Anime React components
import MKBox from "components/MKBox";

function PaginationSection() {
  return (
    <MKBox component="section" py={6} my={1}>
      <Container>
        <Grid container item xs={11} alignItems="center" sx={{ mx: "auto", my: "auto" }}>
          <Pagination count={10} color="info" sx={{ mx: "auto" }} />
        </Grid>
      </Container>
    </MKBox>
  );
}

export default PaginationSection;
