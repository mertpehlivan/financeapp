import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Typography, Grid, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { portfolioList, investors } from "../service/portfolioList"; // Portföy verisi

const ProfilePage = () => {
    const { id } = useParams();
    const investor = investors.find((investor) => investor.id === parseInt(id, 10));

    const portfolios = portfolioList.filter((portfolio) => portfolio.investor.id === parseInt(id, 10));
    const totalPortfolios = portfolios.length;

    // Toplam değeri hesaplamak için creationPrice'ı sayıya dönüştür
    const totalValue = portfolios.reduce((acc, portfolio) => {
        // creationPrice'ı sayıya dönüştür
        const price = parseFloat(portfolio.creationPrice.replace(/[^0-9.-]+/g, ""));
        return acc + (isNaN(price) ? 0 : price);
    }, 0);

    // Dialog state'leri
    const [openDialog, setOpenDialog] = useState(false);
    const [recommendation, setRecommendation] = useState("");
    const [selectedCoin, setSelectedCoin] = useState("");

    // Örnek coin listesi
    const coinOptions = [
        { label: "Bitcoin", value: "BTC" },
        { label: "Ethereum", value: "ETH" },
        { label: "Ripple", value: "XRP" },
        // Daha fazla coin ekleyebilirsiniz
    ];

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSendRecommendation = () => {
        // Öneriyi gönderme işlemi burada yapılabilir (API çağrısı vs.)
        console.log(`Recommendation for ${investor.firstname} ${investor.lastname}: ${recommendation}, Coin: ${selectedCoin}`);
        setOpenDialog(false);
        setRecommendation(""); // TextField'ı temizle
        setSelectedCoin("");   // Coin seçimini temizle
    };

    return (
        <Grid item xs={12} sm={8} md={9} lg={10}>
            {/* Üst Bar */}
            <Box sx={{ bgcolor: 'primary.main', color: 'white', padding: '16px', marginBottom: '20px' }}>
                <Typography variant="h4" component="div">Investor Profile</Typography>
            </Box>

            {/* Yatırımcı Bilgisi */}
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {investor.firstname} {investor.lastname}
                    </Typography>
                    <Typography variant="body1">
                        Email: {investor.email}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleOpenDialog} style={{ marginTop: '20px' }}>
                        Make Recommendation
                    </Button>
                </CardContent>
            </Card>

            {/* Portföyler */}
            <Grid container spacing={2} style={{ marginTop: '20px' }}>
                <Grid item xs={12} sm={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Portfolios
                            </Typography>
                            {portfolios.map((portfolio) => (
                                <Card key={portfolio.id} style={{ marginTop: '10px' }}>
                                    <CardContent>
                                        <Typography variant="h6">{portfolio.name}</Typography>
                                        <Typography variant="body2">{portfolio.description}</Typography>
                                        <Typography variant="subtitle1">Creation Price: {portfolio.creationPrice}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </Grid>

                {/* Portföy Sayısı ve Toplam Değer */}
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" component="div">
                                Portfolio Summary
                            </Typography>
                            <Typography variant="body1">
                                Total Portfolios: {totalPortfolios}
                            </Typography>
                            <Typography variant="body1">
                                Total Value: ${totalValue.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Dialog - Öneri Gönderme */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Make a Recommendation</DialogTitle>
                <DialogContent>
                    <TextField
                        multiline
                        rows={4}
                        autoFocus
                        margin="dense"
                        label="Recommendation"
                        fullWidth
                        variant="outlined"
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value)}
                    />
                    <FormControl fullWidth style={{ marginTop: '16px' }}>
                        <InputLabel>Select Coin</InputLabel>
                        <Select
                            value={selectedCoin}
                            onChange={(e) => setSelectedCoin(e.target.value)}
                        >
                            {coinOptions.map((coin) => (
                                <MenuItem key={coin.value} value={coin.value}>
                                    {coin.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSendRecommendation} color="secondary">
                        Send
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
};

export default ProfilePage;
