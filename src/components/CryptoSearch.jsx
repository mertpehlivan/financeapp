import { TrendingDown, TrendingUp } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import { Grid, Stack, Paper, TextField,Typography, Pagination } from '@mui/material';

const CryptoCard = ({ symbol, priceChangePercent, currentPrice }) => {
    return (
        <Stack>
            <Typography variant="h6">{symbol.toUpperCase()}</Typography>
            <Typography variant="body1">Price: ${currentPrice}</Typography>
            <Stack direction="row" alignItems="center">
                {priceChangePercent >= 0 ? (
                    <>
                        <TrendingUp color="success" />
                        <Typography className="positive">
                            {priceChangePercent}%
                        </Typography>
                    </>
                ) : (
                    <>
                        <TrendingDown color="error" />
                        <Typography className="negative">
                            {priceChangePercent}%
                        </Typography>
                    </>
                )}
            </Stack>
        </Stack>
    );
};




const CryptoSearch = () => {
    const maxSymbols = 200; // Limit to 20 symbols per page
    const [symbols, setSymbols] = useState([]);
    const [prices, setPrices] = useState({});
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSymbols, setFilteredSymbols] = useState([]);

    // Fetch default prices (initial values)
    const fetchDefaultPrices = async (symbols) => {
        try {
            const response = await fetch('https://api.binance.com/api/v3/ticker/24hr');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const defaultPrices = symbols.reduce((acc, symbol) => {
                const cryptoData = data.find(item => item.symbol.toLowerCase() === symbol);
                if (cryptoData) {
                    acc[symbol] = {
                        priceChangePercent: cryptoData.priceChangePercent,
                        currentPrice: cryptoData.lastPrice,
                    };
                }
                return acc;
            }, {});
            setPrices(defaultPrices);
        } catch (error) {
            console.error('API request error:', error);
        }
    };

    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const allSymbols = data.symbols.map(symbol => symbol.symbol.toLowerCase());
                const limitedSymbols = allSymbols.slice(0, maxSymbols);
                setSymbols(limitedSymbols);
                fetchDefaultPrices(limitedSymbols);
            } catch (error) {
                console.error('API request error:', error);
            }
        };

        fetchSymbols();
    }, []);

    useEffect(() => {
        const sockets = [];

        if (symbols.length > 0) {
            symbols.forEach(symbol => {
                const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol}@ticker`);

                socket.onmessage = (event) => {
                    const data = JSON.parse(event.data);
                    setPrices(prevPrices => ({
                        ...prevPrices,
                        [symbol]: {
                            priceChangePercent: data.P, // Get the percentage change
                            currentPrice: data.c, // Get the current price
                        }
                    }));
                };

                sockets.push(socket);
            });
        }

        // Cleanup WebSocket connections when symbols change or component unmounts
        return () => {
            sockets.forEach(socket => socket.close());
        };
    }, [symbols]);

    useEffect(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            setFilteredSymbols(symbols.filter(symbol => symbol.includes(query)));
        } else {
            setFilteredSymbols(symbols);
        }
    }, [searchQuery, symbols]);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const symbolsPerPage = 10;
    const startIndex = (page - 1) * symbolsPerPage;
    const endIndex = startIndex + symbolsPerPage;
    const paginatedSymbols = filteredSymbols.slice(startIndex, endIndex);

    return (
        <Stack mt={10} p={2} alignItems="center" justifyContent="center" height="85vh">
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center">
                        <TextField
                            label="Search.."
                            sx={{ width: 500 }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Stack>
                </Grid>
                {paginatedSymbols.map(symbol => (
                    <Grid item xs={6} key={symbol}>
                        <Paper>
                            <Stack p={2}>
                                <CryptoCard
                                    symbol={symbol}
                                    priceChangePercent={prices[symbol]?.priceChangePercent || 0}
                                    currentPrice={prices[symbol]?.currentPrice || 0}
                                />
                            </Stack>
                        </Paper>
                    </Grid>
                ))}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="center" mt={2}>
                        <Pagination
                            count={Math.ceil(filteredSymbols.length / symbolsPerPage)}
                            page={page}
                            onChange={handlePageChange}
                        />
                    </Stack>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default CryptoSearch;

