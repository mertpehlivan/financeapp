import React from 'react';
import { Button, Container, Grid, Paper, Stack } from '@mui/material';
import TradingViewWidget from './TradingViewWidget';
import DrawerNav from './DrawerNav ';
import { motion } from 'framer-motion';
import CoinTable from './CoinTable';
import { Add } from '@mui/icons-material';
import CreatePortfolioDialog from './CreatePortfolioDialog';

const Dashboard = () => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (

        <Grid item xs={12} sm={8} md={9} lg={10}>
            <CreatePortfolioDialog open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose}/>
            <Stack alignItems="end">
                <Button onClick={handleClickOpen} size="small" variant='contained' startIcon={<Add />}>Create portfolio</Button>
            </Stack>

            <Stack spacing={2}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Paper elevation={3}>
                        <Stack spacing={2} p={2} sx={{ height: { xs: 'auto', sm: 600 } }}>
                            <TradingViewWidget />
                        </Stack>
                    </Paper>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Paper elevation={3}>
                        <CoinTable />
                    </Paper>
                </motion.div>
            </Stack>
        </Grid>

    );
};

export default Dashboard;
