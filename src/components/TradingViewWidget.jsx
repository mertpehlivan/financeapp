import React, { useEffect, useRef, useState, memo } from 'react';
import { TextField, Autocomplete, Box, Stack, Typography, Chip, Divider, Icon, Button } from '@mui/material';
import axios from 'axios';
import { Add, CurrencyBitcoin } from '@mui/icons-material'; // Choose your preferred icon

function TradingViewWidget() {
  const container = useRef();
  const [coin, setCoin] = useState('BTCUSDT'); // Default coin
  const [coins, setCoins] = useState([]);
  const [prices, setPrices] = useState({});
  const [prevPrices, setPrevPrices] = useState({});
  const [percentageChange, setPercentageChange] = useState({});
  const [volume, setVolume] = useState({}); // For volume data
  const [tradingViewWidget, setTradingViewWidget] = useState(null);

  // Fetch the list of coins and their initial prices
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
        const coinList = response.data.map(item => ({
          symbol: item.symbol,
          price: parseFloat(item.price) || 0,
        }));

        // Limit to first 10 coins
        const firstTenCoins = coinList.slice(0, 10);

        // Initialize prices and previous prices
        const priceMap = {};
        const prevPriceMap = {};
        firstTenCoins.forEach(coin => {
          priceMap[coin.symbol] = coin.price;
          prevPriceMap[coin.symbol] = coin.price;
        });
        setCoins(firstTenCoins);
        setPrices(priceMap);
        setPrevPrices(prevPriceMap);
      } catch (error) {
        console.error('Error fetching coins from Binance:', error);
      }
    };
    fetchCoins();
  }, []);

  // Fetch updated prices and calculate percentage changes
  const fetchPrices = async () => {
    try {
      const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
      const updatedPrices = response.data.reduce((acc, item) => {
        acc[item.symbol] = parseFloat(item.price) || 0;
        return acc;
      }, {});

      // Calculate percentage changes
      const newPercentageChange = {};
      for (const symbol in updatedPrices) {
        if (prevPrices[symbol]) {
          const prevPrice = prevPrices[symbol];
          const currentPrice = updatedPrices[symbol];
          newPercentageChange[symbol] = ((currentPrice - prevPrice) / prevPrice) * 100;
        }
      }

      // Update state with new prices and percentage changes
      setPrices(updatedPrices);
      setPercentageChange(newPercentageChange);
      setPrevPrices(updatedPrices); // Update previous prices
    } catch (error) {
      console.error('Error fetching prices from Binance:', error);
    }
  };

  // Set up TradingView widget
  useEffect(() => {
    if (container.current) {
      container.current.innerHTML = ''; // Clear the previous chart

      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": `BINANCE:${coin}`,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "backgroundColor": "rgb(40,40,40)",
        "gridColor": "rgba(255, 229, 153, 0.06)",
        "hide_top_toolbar": true,
        "hide_legend": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": false,
        "save_image": false,
        "calendar": false,
        "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      });
      container.current.appendChild(script);

      script.onload = () => {
        // Access TradingView widget instance
        const widget = window.TradingView.widget();
        setTradingViewWidget(widget);
      };
    }
  }, [coin]);

  // Function to get real-time data from TradingView chart
  const getTradingViewData = () => {
    if (tradingViewWidget) {
      tradingViewWidget.onChartReady(() => {
        const chart = tradingViewWidget.chart();
        const series = chart.series();
        if (series && series.length > 0) {
          const currentSeries = series[0];
          const lastBar = currentSeries.getData().slice(-1)[0]; // Get the last bar data

          if (lastBar) {
            setPrices(prevPrices => ({
              ...prevPrices,
              [coin]: lastBar.close,
            }));

            const volumeData = lastBar.volume; // Access volume data
            setVolume(prevVolume => ({
              ...prevVolume,
              [coin]: volumeData,
            }));

            const percentageChange = ((lastBar.close - (prevPrices[coin] || lastBar.close)) / (prevPrices[coin] || lastBar.close)) * 100;
            setPercentageChange(prevPercentageChange => ({
              ...prevPercentageChange,
              [coin]: percentageChange,
            }));

            // Update previous price
            setPrevPrices(prevPrices => ({
              ...prevPrices,
              [coin]: lastBar.close,
            }));
          }
        }
      });
    }
  };


  useEffect(() => {
    const interval = setInterval(() => {
      getTradingViewData();
    }, 10000); 

    return () => clearInterval(interval);
  }, [tradingViewWidget, coin]);

  const handleCoinChange = async (event, newValue) => {
    if (newValue) {
      setCoin(newValue.symbol);
      await fetchPrices();
    }
  };

  return (
    <Stack height="100%" spacing={2}>
      <Autocomplete
        sx={{ width: "100%" }}
        fullWidth
        size='small'
        options={coins}
        getOptionLabel={(option) => `${option.symbol} - $${prices[option.symbol]?.toFixed(2) || 'N/A'}`}
        style={{ marginBottom: '16px' }}
        onChange={handleCoinChange}
        renderInput={(params) => <TextField sx={{ width: "100%" }} fullWidth {...params} label="Select Coin" variant="outlined" />}
        renderOption={(props, option) => (
          <li {...props} key={option.symbol}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Icon component={CurrencyBitcoin} />
              <Typography variant="body2">{option.symbol}</Typography>
              <Chip label={`$${prices[option.symbol]?.toFixed(2) || 'N/A'}`} size="small" />
              <Chip
                label={`${(percentageChange[option.symbol] || 0).toFixed(2)}%`}
                size="small"
                color={(percentageChange[option.symbol] || 0) > 0 ? 'success' : 'error'}
              />
            </Stack>
          </li>
        )}
      />
      
      <Stack direction="row" spacing={1}>
        <Typography variant="body2">Price: ${prices[coin]?.toFixed(2) || 'N/A'}</Typography>
        <Typography variant="body2">Volume: {volume[coin]?.toFixed(2) || 'N/A'}</Typography>
        <Typography variant="body2">Percentage Change: {(percentageChange[coin] || 0).toFixed(2)}%</Typography>
      </Stack>
      <Box className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
        <Box className="tradingview-widget-container__widget" style={{ height: 'calc(100% - 32px)', width: '100%' }}></Box>
      </Box>
      <Box sx={{ padding: '16px' }}>
        <Divider />
        
      </Box>
    </Stack>
  );
}

export default memo(TradingViewWidget);
