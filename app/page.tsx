import Image from "next/image";
import styles from "./page.module.css";
import { Container, Grid } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Link from 'next/link'

async function getData() {
  const res = await fetch('http://localhost:3000/api')

  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const result = res.json()
  return result
}

export default async function Home() {
  const data = await getData()
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {data.data.map((item: any) => (
              <Grid item xs={12} md={4} key={item.id} >
                <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.coverimage}
                      alt="image"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.detail}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      <Link href={`/travel/${item.id}`} >
                        More detail
                      </Link>
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </div>
    </main>
  );
}
