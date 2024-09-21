import React from 'react';
import { Container, Grid, Paper, Stack } from '@mui/material';
import DrawerNav from '../components/DrawerNav ';
import { Outlet } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                {/* DrawerNav section */}
                <Grid item xs={12} sm={4} md={3} lg={2}>
                    <DrawerNav />
                </Grid>
                <Outlet/>     
            </Grid>
        </Container>
    );
};

export default HomePage;
