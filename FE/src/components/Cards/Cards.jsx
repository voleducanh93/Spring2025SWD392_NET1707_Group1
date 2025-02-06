
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container, Grid } from '@mui/material';
import anhVacxin from "../../assets/vac-xin-pentaxim-1.jpg"
const cardsData = [
  {
    title: "",
    description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica.",
    image: anhVacxin,
  },
  {
    title: "",
    description: "Chameleons are distinguished by their zygodactylous feet, swaying gait, and unique ability to change color.",
    image:anhVacxin  },
  {
    title: "",
    description: "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "",
    description: "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "",
    description: "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "",
    description: "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  },
  {
    title: "",
    description: "Geckos are unique among lizards for their vocalizations, making chirping sounds for communication.",
    image: anhVacxin,
  }
];

export default function Cards() {
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={4}>
        {cardsData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia component="img" alt={card.title} height="140" image={card.image} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}