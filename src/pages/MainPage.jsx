import { Box, Button, Container, Divider, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import CryptoCardList from '../components/CryptoCardList';
import '../styles/HomePage.css';

import NewsAbstractList from '../components/NewsAbstractList';
import CryptoSearch from '../components/CryptoSearch';

export default function MainPage() {
    const text = "Expertise";
    return (
        <Container maxWidth sx={{ mt: 1 }}>
            <Grid container>
                <Grid item xs={6}>
                    <Stack height="85vh" direction="row" justifyContent="center" alignItems="center">
                        <Box>
                            <Stack direction="row" spacing={1}>
                                <Typography variant='h1'>
                                    Where
                                </Typography>
                                <Typography variant='h1' color="secondary.main">
                                    <b>
                                        {text.split('').map((letter, index) => (
                                            <span key={index} className="animated-letter">
                                                {letter}
                                            </span>
                                        ))}
                                    </b>
                                </Typography>
                            </Stack>

                            <Stack>
                                <Typography variant='h2'>
                                    Meets Elegance
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={6}>
                    <CryptoCardList />
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <div id='market-news'>
                    <NewsAbstractList />
                </div>
            </Grid>
            <Grid container mt={2}>
                <CryptoSearch />
            </Grid>
        </Container>
    );
}
