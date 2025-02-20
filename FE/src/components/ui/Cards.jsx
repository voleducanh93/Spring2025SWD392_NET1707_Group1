import { useState } from "react";
import { motion } from "framer-motion";
import {
  Container,
  Grid,
  CircularProgress,
  Alert,
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Pagination,
} from "@mui/material";
import { useVaccine } from "../../hooks/useVaccine";
import imgTam from "../../assets/vac-xin-pentaxim-1.jpg";

const ITEMS_PER_PAGE = 12; // Số vaccine mỗi trang

export default function Cards() {
  const { vaccines, isLoading, isError, error } = useVaccine();
  const [page, setPage] = useState(1); // Quản lý trang hiện tại

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

  // Tính toán vaccine hiển thị theo trang hiện tại
  const totalPages = Math.ceil(vaccines.length / ITEMS_PER_PAGE);
  const displayedVaccines = vaccines.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

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
      </div>

      {/* Hiển thị danh sách vaccine */}
      <Grid container spacing={4}>
        {displayedVaccines.map((vaccine, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
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
                  image={imgTam} //{vaccine.image || "default-image.jpg"} // Fallback image
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
                    sx={{
                      fontWeight: "bold",
                      color: "#2A388F",
                      fontSize: "1.2rem",
                    }}
                  >
                    {vaccine.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "#555",
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
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

      {/* Phân trang */}
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Container>
    </Container>
  );
}
