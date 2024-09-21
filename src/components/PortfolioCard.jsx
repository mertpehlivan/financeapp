import { Card, CardContent, CardActions, Chip, Stack, Typography, Button, Divider, Grid, Avatar } from '@mui/material';
import { Description as DescriptionIcon, Category as CategoryIcon, ShowChart as ShowChartIcon, TrendingUp as TrendingUpIcon, AttachMoney as AttachMoneyIcon } from '@mui/icons-material';
import React from 'react';
import StockChart from './StockChart'; // Import the new chart component
import { Link } from 'react-router-dom';

const PortfolioCard = ({ data, onViewDetails }) => {
    const getColorByVolatility = (volatility) => {
        switch (volatility) {
            case 'High':
                return 'red'; // Yüksek volatilite için kırmızı
            case 'Medium':
                return 'orange'; // Orta volatilite için turuncu
            case 'Low':
                return 'green'; // Düşük volatilite için yeşil
            default:
                return 'gray'; // Bilinmeyen durumlar için gri
        }
    };

    // Get the most recent stock based on current price
    const topStock = data.categories.flatMap(category => category.stocks)
        .sort((a, b) => b.currentPrice - a.currentPrice)[0];

    const chipColor = topStock ? getColorByVolatility(topStock.volatility) : 'gray';

    return (
        <Card elevation={6} sx={{ padding: 3, width: "100%", borderRadius: 2, boxShadow: 3 }}>
            <CardContent>
                {/* Portfolio Name, Investor and Creation Price */}
                <Stack alignItems="center" justifyContent="space-between" direction="row" mb={3}>
                    <Typography variant='h5' fontWeight="bold" color="text.primary">{data.name}</Typography>
                    <Chip label={`Creation Price: ${data.creationPrice}`} color="primary" sx={{ fontWeight: 'bold' }} />
                </Stack>

                {/* Investor Information */}
                <Link to={`${data.investor.id}`}>

                    <Chip sx={{ m: 1 }} label={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Avatar sx={{ width: 20, height: 20 }} />
                            <Typography variant="body2" color="text.primary">
                                {`${data.investor.firstname} ${data.investor.lastname}`}
                            </Typography>
                        </Stack>

                    } />
                </Link>
                {/* Portfolio Description */}
                {data.description && (
                    <Stack direction="row" spacing={1} alignItems="center" mb={3}>
                        <DescriptionIcon color="action" />
                        <Typography variant="body1" color="text.secondary">
                            <strong>Description:</strong> {data.description}
                        </Typography>
                    </Stack>
                )}

                {/* Categories Summary */}
                <Typography variant="subtitle1" mb={2} color="text.secondary">
                    <strong>Portfolio Summary:</strong>
                </Typography>
                {data.categories.length > 0 && (
                    <Stack spacing={2} mb={3}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <CategoryIcon color="action" />
                            <Typography variant="body2" color="text.primary">
                                <strong>Total Categories:</strong> {data.categories.length}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <AttachMoneyIcon color="action" />
                            <Typography variant="body2" color="text.primary">
                                <strong>Total Stocks:</strong> {data.categories.reduce((acc, category) => acc + category.stocks.length, 0)}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <TrendingUpIcon color="action" />
                            <Typography variant="body2" color="text.primary">
                                <strong>Top Category:</strong> {data.categories[0].name}
                            </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <ShowChartIcon color="action" />
                            <Typography variant="body2" color="text.primary">
                                <strong>Top Stock:</strong> {topStock?.name} - ${topStock?.currentPrice}
                            </Typography>
                        </Stack>
                        <Divider sx={{ my: 2 }} />
                    </Stack>
                )}

                {/* Detailed Stock Information */}
                {topStock && (
                    <Grid container spacing={2} mb={3}>
                        <Grid item xs={12} sm={6}>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ShowChartIcon color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Stock Name:</strong> {topStock.name}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AttachMoneyIcon color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Current Price:</strong> ${topStock.currentPrice}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <AttachMoneyIcon color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Expected Buy Price:</strong> {topStock.expectedBuyPrice}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            {/* Additional detailed stock information */}
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ShowChartIcon color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Historical Performance:</strong> {topStock.historicalPerformance}
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Volatility:</strong>
                                    <Chip
                                        label={topStock.volatility}
                                        style={{ backgroundColor: chipColor, color: 'white', marginLeft: 8 }}
                                    />
                                </Typography>
                            </Stack>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <ShowChartIcon color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Market Cap:</strong> {topStock.marketCap}
                                </Typography>
                            </Stack>
                        </Grid>
                    </Grid>
                )}

                {/* Stock Chart */}
                <StockChart data={data} />
            </CardContent>

            {/* View Details Button */}
            <CardActions>
                <Link to={`/home/portfolios/${data.id}`}>

                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ borderRadius: 1, textTransform: 'uppercase' }}

                    >
                        View Details
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
};

export default PortfolioCard;
