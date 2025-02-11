import { motion } from "framer-motion"; // Ensure motion is imported from framer-motion
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import anhVacxin from "../../assets/vac-xin-pentaxim-1.jpg"; // Your image source

// Data for vaccines (replace these titles and images accordingly)
const cardsData = [
  {
    title: "Vaccine 1",
    description:
      "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
    image: anhVacxin,
  },
  {
    title: "Vaccine 2",
    description:
      "Chameleons are distinguished by their zygodactylous feet, swaying gait, and unique ability to change color.",
    image: anhVacxin,
  },
  {
    title: "Vaccine 3",
    description:
      "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "Vaccine 4",
    description:
      "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "Vaccine 5",
    description:
      "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "Vaccine 6",
    description:
      "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "Vaccine 7",
    description:
      "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
];

export default function Cards() {
  return (
    <Container sx={{ mt: 5, position: "relative" }}>
      {/* Title Section with underline */}
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
            color: "#2A388F", // Modern font color
            borderBottom: "2px solid #2A388F", // Create the underline
            paddingBottom: "4px", // Spacing between text and underline
          }}
        >
          Danh mục Vắc Xin
        </Typography>

        {/* Xem tất cả Button */}
        <Button
          variant="outlined"
          sx={{
            borderColor: "#2A388F",
            color: "#2A388F",
            borderRadius: "20px", // Round corners for a modern touch
            padding: "6px 16px", // More padding for button
            "&:hover": {
              borderColor: "#1F2B75",
              color: "#1F2B75",
              backgroundColor: "rgba(0, 0, 0, 0.1)", // Subtle background change
            },
          }}
          onClick={() => {
            /* Action for "Xem tất cả" */
          }}
        >
          Xem tất cả
        </Button>
      </div>

      {/* Grid Layout */}
      <Grid container spacing={4}>
        {cardsData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <motion.div
              whileHover={{ scale: 1.02 }} // Reduced scale effect on hover
              transition={{ type: "spring", stiffness: 150 }} // Reduced stiffness for more subtle effect
            >
              <Card
                sx={{
                  maxWidth: 345,
                  transition: "all 0.3s ease-in-out",
                  boxShadow: 3, // Reduced initial box shadow
                  "&:hover": {
                    boxShadow: 8, // Subtler shadow on hover
                    transform: "translateY(-5px)", // Smaller lift effect
                  },
                  borderRadius: "12px", // Rounded corners for modern look
                  backgroundColor: "#f9f9f9", // Light background color for cards
                }}
              >
                <CardMedia
                  component="img"
                  alt={card.title}
                  height="200"
                  image={card.image}
                  sx={{
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px", // Rounded top corners
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
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "#555",
                      fontSize: "0.9rem",
                      lineHeight: "1.4", // Adjust line height for better readability
                    }}
                  >
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{
                      "&:hover": {
                        backgroundColor: "#FF7043",
                        color: "white",
                        transform: "scale(1.05)", // Reduced scale effect for buttons
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
                        transform: "scale(1.05)", // Reduced scale effect for buttons
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
