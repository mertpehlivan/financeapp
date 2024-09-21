import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const PortfolioList = ({ portfolios }) => {
    return (
        <List>
            {portfolios.map((portfolio, index) => (
                <ListItem key={index}>
                    <ListItemText 
                        primary={portfolio.name} 
                        secondary={`Creation Price: ${portfolio.creationPrice}`} 
                    />
                </ListItem>
            ))}
        </List>
    );
};

export default PortfolioList;
