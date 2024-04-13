import { Container, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

async function getData(id: string) {
  const res = await fetch(`http://localhost:3000/api/${id}`)
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const result = await res.json()
  return result.data[0];
}

export default async function Home({ params: { id }, }: { params: { id: string } }) {
  try {
    const data = await getData(id);
    return (
        <Container maxWidth="xl">
        <Grid container justifyContent="center" alignItems="center" style={{ height: "100vh" }}>
            <Grid item xs={12} key={data.id} >
              <Card sx={{ maxWidth: 600 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="450"
                    image={data.coverimage}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {data.detail}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Container>
    );
  } catch (error) {
    console.error(error);
    return <p>Error fetching data</p>;
  }
}