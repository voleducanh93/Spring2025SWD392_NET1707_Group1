import { motion } from "framer-motion";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid, CircularProgress, Alert } from "@mui/material";
import { useVaccine } from "../../hooks/useVaccine";

export default function Cards() {
  const { vaccines, isLoading, isError, error } = useVaccine();

  if (isLoading) {
    return (
      <Container sx={{ mt: 5, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container sx={{ mt: 5 }}>
        <Alert severity="error">Error fetching data: {error?.message}</Alert>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5, position: "relative" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#2A388F",
            borderBottom: "2px solid #2A388F",
            paddingBottom: "4px",
          }}
        >
          Danh mục Vắc Xin
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#2A388F",
            color: "#2A388F",
            borderRadius: "20px",
            padding: "6px 16px",
            "&:hover": {
              borderColor: "#1F2B75",
              color: "#1F2B75",
              backgroundColor: "rgba(0, 0, 0, 0.1)",
            },
          }}
          onClick={() => {
            /* Handle view all action */
          }}
        >
          Xem tất cả
        </Button>
      </div>
      <Grid container spacing={4}>
        {vaccines.map((vaccine, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 150 }}
            >
              <Card
                sx={{
                  maxWidth: 345,
                  transition: "all 0.3s ease-in-out",
                  boxShadow: 3,
                  "&:hover": {
                    boxShadow: 8,
                    transform: "translateY(-5px)",
                  },
                  borderRadius: "12px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <CardMedia
                  component="img"
                  alt={vaccine.name}
                  height="200"
                  image={vaccine.image || "default-image.jpg"} // Fallback image
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                  }}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: "bold", color: "#2A388F", fontSize: "1.2rem" }}
                  >
                    {vaccine.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#555", fontSize: "0.9rem", lineHeight: "1.4" }}
                  >
                    {vaccine.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#FF7043",
                        color: "white",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Share
                  </Button>
                  <Button
                    size="small"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#0288D1",
                        color: "white",
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
