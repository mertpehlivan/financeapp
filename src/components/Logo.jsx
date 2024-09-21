import { Stack, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h2: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      color: '#004085', // Deep blue color for a professional look
    },
  },
});

function Logo() {
  return (
    <ThemeProvider theme={theme}>
      <Stack 
        direction="row" 
        alignItems="center" 
        spacing={1} 
        style={{ backgroundColor: '#E9ECEF', padding: '10px', borderRadius: '5px' }}
      >
        <Typography variant="h2" component="div">
          PortfoLux
        </Typography>
        {/* Optionally, you could add an icon or graphic here */}
      </Stack>
    </ThemeProvider>
  );
}

export default Logo;
