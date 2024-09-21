import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const CryptocurrencyList = ({ cryptocurrencies }) => {
    return (
        <List>
            {cryptocurrencies.map((crypto, index) => (
                <ListItem key={index}>
                    <ListItemText
                        primary={`${crypto.name} - Price: ${crypto.price}`}
                        secondary={`Volume: ${crypto.volume} | 24h Change: ${crypto.change24h}`}
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default CryptocurrencyList;
