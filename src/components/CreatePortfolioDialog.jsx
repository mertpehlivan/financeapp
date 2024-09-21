import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
  },
}));

export default function CreatePortfolioDialog({ open, setOpen, handleClickOpen, handleClose }) {
  const [portfolio, setPortfolio] = useState({
    name: '',
    creationPrice: '',
    description: '',
    investor: { firstname: '', lastname: '', email: '' },
    categories: [
      {
        name: '',
        description: '',
        stocks: [{ name: '', currentPrice: '', note: '', type: '', expectedPrice: '' }],
      },
    ],
  });

  const handleInputChange = (e, field, index, subfield, stockIndex) => {
    if (subfield && stockIndex !== undefined) {
      setPortfolio({
        ...portfolio,
        categories: portfolio.categories.map((cat, i) =>
          i === index
            ? {
              ...cat,
              stocks: cat.stocks.map((stock, si) =>
                si === stockIndex ? { ...stock, [subfield]: e.target.value } : stock
              ),
            }
            : cat
        ),
      });
    } else if (subfield) {
      setPortfolio({
        ...portfolio,
        categories: portfolio.categories.map((cat, i) =>
          i === index ? { ...cat, [field]: { ...cat[field], [subfield]: e.target.value } } : cat
        ),
      });
    } else {
      setPortfolio({
        ...portfolio,
        [field]: e.target.value,
      });
    }
  };

  const handleCategoryChange = (index, field, value) => {
    const updatedCategories = portfolio.categories.map((category, i) =>
      i === index ? { ...category, [field]: value } : category
    );
    setPortfolio({ ...portfolio, categories: updatedCategories });
  };

  const handleAddCategory = () => {
    setPortfolio({
      ...portfolio,
      categories: [
        ...portfolio.categories,
        { name: '', description: '', stocks: [{ name: '', currentPrice: '', note: '', type: '', expectedPrice: '' }] },
      ],
    });
  };

  const handleAddStock = (index) => {
    const updatedCategories = portfolio.categories.map((category, i) =>
      i === index
        ? {
          ...category,
          stocks: [
            ...category.stocks,
            { name: '', currentPrice: '', note: '', type: '', expectedPrice: '' },
          ],
        }
        : category
    );
    setPortfolio({ ...portfolio, categories: updatedCategories });
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        Create Portfolio
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              size='small'
              label="Portfolio Name"
              fullWidth
              variant="outlined"
              value={portfolio.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size='small'
              label="Creation Price"
              fullWidth
              variant="outlined"
              value={portfolio.creationPrice}
              onChange={(e) => handleInputChange(e, 'creationPrice')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              size='small'
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={portfolio.description}
              onChange={(e) => handleInputChange(e, 'description')}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
              Investor Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  size='small'
                  label="First Name"
                  fullWidth
                  variant="outlined"
                  value={portfolio.investor.firstname}
                  onChange={(e) => handleInputChange(e, 'investor', null, 'firstname')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size='small'
                  label="Last Name"
                  fullWidth
                  variant="outlined"
                  value={portfolio.investor.lastname}
                  onChange={(e) => handleInputChange(e, 'investor', null, 'lastname')}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  size='small'
                  label="Email"
                  fullWidth
                  variant="outlined"
                  value={portfolio.investor.email}
                  onChange={(e) => handleInputChange(e, 'investor', null, 'email')}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Categories
        </Typography>
        {portfolio.categories.map((category, index) => (
          <Card key={index} sx={{ mb: 3 }}>
            <CardHeader
              title={`Category ${index + 1}`}
              action={
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleAddStock(index)}
                >
                  Add Stock
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    size='small'
                    label="Category Name"
                    fullWidth
                    variant="outlined"
                    value={category.name}
                    onChange={(e) => handleCategoryChange(index, 'name', e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    size='small'
                    label="Category Description"
                    fullWidth
                    multiline
                    rows={2}
                    variant="outlined"
                    value={category.description}
                    onChange={(e) => handleCategoryChange(index, 'description', e.target.value)}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Stocks
              </Typography>
              {category.stocks.map((stock, stockIndex) => (
                <Box key={stockIndex} sx={{ mb: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        size='small'
                        label="Stock Name"
                        fullWidth
                        variant="outlined"
                        value={stock.name}
                        onChange={(e) =>
                          handleInputChange(e, 'stocks', index, 'name', stockIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        size='small'
                        label="Current Price"
                        fullWidth
                        variant="outlined"
                        value={stock.currentPrice}
                        onChange={(e) =>
                          handleInputChange(e, 'stocks', index, 'currentPrice', stockIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        size='small'
                        label="Expected Price"
                        fullWidth
                        variant="outlined"
                        value={stock.expectedPrice}
                        onChange={(e) =>
                          handleInputChange(e, 'stocks', index, 'expectedPrice', stockIndex)
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        size='small'
                        label="Type"
                        fullWidth
                        variant="outlined"
                        value={stock.type}
                        onChange={(e) =>
                          handleInputChange(e, 'stocks', index, 'type', stockIndex)
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        size='small'
                        label="Note"
                        fullWidth
                        variant="outlined"
                        value={stock.note}
                        onChange={(e) =>
                          handleInputChange(e, 'stocks', index, 'note', stockIndex)
                        }
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </CardContent>
          </Card>
        ))}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddCategory}
          sx={{ mt: 3 }}
        >
          Add Category
        </Button>
      </DialogContent>
      <DialogActions>
        <Button  onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={() => console.log(portfolio)} color="primary" variant="contained">
          Save Portfolio
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
