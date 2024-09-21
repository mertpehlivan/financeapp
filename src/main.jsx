import { StrictMode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createTheme, ThemeProvider, CssBaseline, Stack, Paper, Typography, Button, Avatar, Menu, MenuItem } from '@mui/material';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NewsPage from './pages/NewsPage.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Dashboard from './components/Dashboard.jsx';
import './index.css';
import ExplorePage from './pages/ExplorePage.jsx';
import PortfolioDetailPage from './pages/PortfolioDetailPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import RecommendedStocks from './pages/RecommendedPage.jsx';
// Light Theme Configuration
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#004085', // Dark Blue
    },
    secondary: {
      main: '#218838', // Green
    },
    warning: {
      main: '#FFC107', // Gold
    },
    background: {
      default: '#E9ECEF', // Light Gray
      paper: '#FFFFFF',  // White
    },
    text: {
      primary: '#212529', // Dark Gray
      secondary: '#495057', // Light Gray
    },
  },
});

// Dark Theme Configuration
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#004085', // Dark Blue
    },
    secondary: {
      main: '#218838', // Green
    },
    warning: {
      main: '#FFC107', // Gold
    },
    background: {
      default: '#121212', // Dark Gray
      paper: '#1D1D1D',  // Dark Gray
    },
    text: {
      primary: '#E0E0E0', // Light Gray
      secondary: '#B0B0B0', // Lighter Gray
    },
  },
});
import { Navigate } from 'react-router-dom';

// Check if a user is logged in
const user = JSON.parse(localStorage.getItem("loggedInUser"));

// Router Setup
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: user ? <Navigate to="/home" /> : <LoginPage />,
  },
  {
    path: "/register",
    element: user ? <Navigate to="/home" /> : <RegisterPage />,
  },
  {
    path: "/home",
    element: user ? <HomePage /> : <Navigate to="/login" />,
    children: [
      {
        path: "",
        element: user ? <Dashboard /> : <Navigate to="/login" />,
      },
      {
        path: "notifications",
        element: user ? <NotificationPage /> : <Navigate to="/login" />,
      },
      {
        path: "search",
        element: user ? <SearchPage /> : <Navigate to="/login" />,
      },
      {
        path: "portfolios/:id",
        element: user ? <PortfolioDetailPage /> : <Navigate to="/login" />,
      },
      {
        path: "investors/:id",
        element: user ? <ProfilePage /> : <Navigate to="/login" />,
      },
      {
        path: "explore-portfolios",
        element: user ? <ExplorePage /> : <Navigate to="/login" />,
      },
      {
        path: "recommended",
        element: user ? <RecommendedStocks /> : <Navigate to="/login" />,
      },
    ],
  },
  {
    path: "/news",
    element: user ? <NewsPage /> : <Navigate to="/login" />,
  },
]);

export default router;


const handleMenuClose = () => {
  localStorage.clear("loggedInUser")
  
  setAnchorEl(null);
};

// Application Wrapper Component
function AppWrapper() {
  const [darkMode, setDarkMode] = useState(true);
  const user = JSON.parse(localStorage.getItem("loggedInUser"))
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <>
        <CssBaseline />
        <Paper elevation={1} sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" p={2} alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography variant="h4" fontWeight={400}>Portfo</Typography>
              <Typography variant="h4" color="secondary.main" fontWeight={700}>
                <b>Lux</b>
              </Typography>

            </Stack>

            <Stack direction="row" spacing={1}>
              <Button variant="contained" size="small" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </Button>
              {!localStorage.getItem("loggedInUser") && <Stack direction="row" spacing={1} alignItems="center">

                <a href='/login'>

                  <Button variant="contained" size="small">
                    Free Join
                  </Button>
                </a>
              </Stack>}
              {localStorage.getItem("loggedInUser") && <Stack direction="row" spacing={1} alignItems="center">

                <Avatar />
                <Typography>{user.firstname} {user.lastname}</Typography>
               
              </Stack>}
            </Stack>

          </Stack>
        </Paper>

        <RouterProvider router={router} />

        <Stack spacing={2} mt={10} alignItems="center">
          <Typography variant="body2">
            © {new Date().getFullYear()} Your Company. All Rights Reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <a href="/privacy-policy">
              <Button variant="text">Privacy Policy</Button>
            </a>
            <a href="/terms-of-service">
              <Button variant="text">Terms of Service</Button>
            </a>
          </Stack>
        </Stack>
      </>
    </ThemeProvider>
  );
}

// Render the App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
