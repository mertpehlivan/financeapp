import React, { useState } from 'react';
import { Paper, Stack, Typography, Divider, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Menu as MenuIcon, Dashboard as DashboardIcon, Search as SearchIcon, Notifications as NotificationsIcon, Star as StarIcon, Explore as ExploreIcon, Favorite as FavoriteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

const DrawerNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedIndex, setSelectedIndex] = React.useState(null); // State to track selected item
    const [anchorEl, setAnchorEl] = React.useState(null); // For user menu
    const user = JSON.parse(localStorage.getItem("loggedInUser"))
    React.useEffect(() => {
        // Determine which item to select based on the current path
        const path = location.pathname;
        let index = 0;
        switch (path) {
            case `/home/investors/${user.id}`:
                index = 1;
                break;
            case '/home/explore-portfolios':
                index = 2;
                break;
            case '/home/recommended':
                index = 3;
                break;
            case '/home/search':
                index = 4;
                break;
            case '/home/notifications':
                index = 5;
                break;
            default:
                index = 0;
        }
        setSelectedIndex(index);
    }, [location.pathname]);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        localStorage.clear("loggedInUser")
        navigate("/")
        setAnchorEl(null);
    };

    const handleMenuItemClick = (index, path) => {
        setSelectedIndex(index);
        navigate(path); // Navigate to the corresponding path
    };

    const menuOpen = Boolean(anchorEl);

    return (
        <motion.div
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <Paper elevation={3} sx={{ height: '85vh', display: 'flex', flexDirection: 'column', padding: 2 }}>
            
                <Stack spacing={2}>
                    <Typography variant="h6">Navigation</Typography>
                    <Divider />
                    <Stack spacing={1}>
                        {[
                            { text: 'Dashboard', icon: <DashboardIcon />, path: '/home' },
                            { text: 'My Portfolio', icon: <StarIcon />, path: `/home/investors/${user.id}` },
                            { text: 'Explore Portfolios', icon: <ExploreIcon />, path: '/home/explore-portfolios' },
                            { text: 'Recommended', icon: <FavoriteIcon />, path: '/home/recommended' },
                            { text: 'Search', icon: <SearchIcon />, path: '/home/search' },
                            { text: 'Notifications', icon: <NotificationsIcon />, path: '/home/notifications' }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleMenuItemClick(index, item.path)}
                                style={{
                                    backgroundColor: selectedIndex === index ? 'black' : 'transparent',
                                    color: selectedIndex === index ? 'white' : 'inherit',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                <Stack direction="row" alignItems="center" spacing={1} p={1}>
                                    {item.icon}
                                    <Typography variant="h6">{item.text}</Typography>
                                </Stack>
                            </motion.div>
                        ))}
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ marginTop: 'auto', paddingTop: 2 }}>
                    <Avatar src="/path/to/avatar.jpg" alt="User Avatar" />
                    <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="space-between" width="100%">
                        <Typography variant="body2">{user.firstname} Name</Typography>
                        <IconButton onClick={handleMenuClick}>
                            <MoreVertIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </Paper>

            {/* User menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        width: 200,
                    },
                }}
            >
                <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
                <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
            </Menu>
        </motion.div>
    );
};

export default DrawerNav;
