import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, Grid, Stack } from '@mui/material';

const RecommendedStocks = () => {
    // Sahte önerilen hisse senetleri verisi
    const recommendedStocks = [
        {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            recommendationReason: 'Strong earnings growth and innovation.',
            investor: 'Warren Buffett',
        },
        {
            symbol: 'TSLA',
            name: 'Tesla, Inc.',
            recommendationReason: 'High growth potential in electric vehicles.',
            investor: 'Cathie Wood',
        },
        {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            recommendationReason: 'Dominant position in search and advertising.',
            investor: 'Larry Page',
        },
        {
            symbol: 'AMZN',
            name: 'Amazon.com, Inc.',
            recommendationReason: 'Leader in e-commerce and cloud computing.',
            investor: 'Jeff Bezos',
        },
        {
            symbol: 'MSFT',
            name: 'Microsoft Corporation',
            recommendationReason: 'Strong position in cloud and software services.',
            investor: 'Bill Gates',
        },
        // Daha fazla öneri buraya eklenebilir
    ];

    return (
        <Grid item xs={12} sm={8} md={9} lg={10}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>Recommended Stocks</Typography>

            <Stack>
                <Grid container spacing={1}>
                    {recommendedStocks.map((stock, index) => (
                        <Grid item xs={4} key={index}>
                            <Card sx={{ width: '100%' }}>
                                <CardContent>
                                    <Typography variant="h6">{stock.symbol} - {stock.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {stock.recommendationReason}
                                    </Typography>
                                    <Typography variant="caption" color="textPrimary">
                                        Recommended by: {stock.investor}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
        </Grid>
    );
};

export default RecommendedStocks;
