import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Box, TextField } from '@mui/material';

const ROWS_PER_PAGE = 3;

const CoinTable = () => {
  const [coins, setCoins] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [ws, setWs] = useState(null);
  const [connected, setConnected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price');
        const coinList = response.data.map(item => ({
          symbol: item.symbol,
          price: parseFloat(item.price) || 0,
          volume: 0,
          percentChange: 0
        }));
        setCoins(coinList);
        setTotalCoins(coinList.length); // Set total number of coins for pagination
      } catch (error) {
        console.error('Error fetching coins from Binance:', error);
      }
    };

    fetchCoins();

    const socket = new WebSocket('wss://stream.binance.com:9443/ws/!ticker@arr');
    socket.onopen = () => setConnected(true);
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Log the data to inspect its structure
      console.log('WebSocket data received:', data);

      // Check if data is an array
      if (Array.isArray(data)) {
        setCoins(prevCoins => {
          return prevCoins.map(coin => {
            const updatedData = data.find(item => item.s === coin.symbol);
            if (updatedData) {
              return {
                ...coin,
                price: parseFloat(updatedData.c) || 0,
                volume: parseFloat(updatedData.v) || 0,
                percentChange: parseFloat(updatedData.P) || 0
              };
            }
            return coin;
          });
        });
      } else {
        console.error('Unexpected data format:', data);
      }
    };

    setWs(socket);

    return () => {
      if (socket) socket.close();
    };
  }, []);

  useEffect(() => {
    if (ws && connected) {
      const startIndex = currentPage * ROWS_PER_PAGE;
      const endIndex = startIndex + ROWS_PER_PAGE;
      const currentCoins = coins.slice(startIndex, endIndex);

      const subscriptionList = currentCoins.map(coin => coin.symbol.toLowerCase()).join('@');
      if (subscriptionList) {
        ws.send(JSON.stringify({
          method: 'SUBSCRIBE',
          params: [`${subscriptionList}@ticker`],
          id: 1
        }));
      }
    }
  }, [currentPage, coins, ws, connected]);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
    setCurrentPage(0); // Reset to the first page on search
  };

  const filteredCoins = coins.filter(coin =>
    coin.symbol.toLowerCase().includes(searchQuery)
  );

  const paginatedCoins = filteredCoins.slice(currentPage * ROWS_PER_PAGE, (currentPage + 1) * ROWS_PER_PAGE);

  return (
    <Container maxWidth sx={{ p: 1 }}>
      <TextField
        size='small'
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={handleSearchChange}
        value={searchQuery}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Volume</TableCell>
              <TableCell>Change (%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCoins.map((coin, index) => (
              <TableRow key={index}>
                <TableCell>{coin.symbol}</TableCell>
                <TableCell>${coin.price.toFixed(2)}</TableCell>
                <TableCell>{coin.volume.toFixed(2)}</TableCell>
                <TableCell>{coin.percentChange.toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={2} display="flex" justifyContent="center">
        <TablePagination
          rowsPerPageOptions={[ROWS_PER_PAGE]}
          component="div"
          count={filteredCoins.length}
          rowsPerPage={ROWS_PER_PAGE}
          page={currentPage}
          onPageChange={handleChangePage}
        />
      </Box>
    </Container>
  );
};

export default CoinTable;
