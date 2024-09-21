import { Chip, Grid, Paper, Stack, Typography, Divider } from '@mui/material'
import React from 'react'
import { portfolioList } from '../service/portfolioList'
import PortfoloCard from '../components/PortfolioCard'


const ExplorePage = () => {
    return (

        <Grid item xs={12} sm={8} md={9} lg={10}>
            <Stack spacing={2}>
                {portfolioList.map((data, index) => (
                    <PortfoloCard key={index} data={data} />
                ))}
            </Stack>
        </Grid>

    )
}

export default ExplorePage
