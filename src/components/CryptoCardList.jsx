import React, { useEffect, useState } from 'react';
import '../styles/CryptoCardList.css';
import { Grid, Paper, Stack, Typography } from '@mui/material';
import { TrendingDown, TrendingUp } from '@mui/icons-material';

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

const CryptoCardList = () => {
  const maxSymbols = 10; // Limit to 5 symbols
  const [symbols, setSymbols] = useState([]);
  const [prices, setPrices] = useState({});

  // Fetch default values (initial prices and percentage changes)
  const fetchDefaultPrices = async (symbols) => {
    try {
      const response = await fetch(`https://api.binance.com/api/v3/ticker/24hr`);
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
        const limitedSymbols = data.symbols.slice(0, maxSymbols).map(symbol => symbol.symbol.toLowerCase());
        setSymbols(limitedSymbols);
        // Fetch default prices once symbols are set
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
          console.log(data)
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

  return (
    <Stack className="crypto-card-list" p={2} alignItems="center" justifyContent="center" height="85vh">
      <Grid container spacing={1}>
        {symbols.map(symbol => (
          <Grid item xs={6}>
            <Paper>
              <Stack p={2}>


                <CryptoCard
                  key={symbol}
                  symbol={symbol}
                  priceChangePercent={prices[symbol]?.priceChangePercent || 0}
                  currentPrice={prices[symbol]?.currentPrice || 0}
                />
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default CryptoCardList;
