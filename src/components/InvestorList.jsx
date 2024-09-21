import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const InvestorList = ({ investors }) => {
    return (
        <List>
            {investors.map((investor, index) => (
                <ListItem key={index}>
                    <ListItemText primary={investor.name} />
                </ListItem>
            ))}
        </List>
    );
};

export default InvestorList;
