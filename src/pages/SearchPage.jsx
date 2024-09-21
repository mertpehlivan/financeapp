import React, { useState } from "react";
import { portfolioList } from "../service/portfolioList"; // Import your portfolio data
import { TextField, Card, CardContent, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

// Helper function to highlight search term
const highlightText = (text, searchTerm) => {
  if (!searchTerm) return text;

  const parts = text.split(new RegExp(`(${searchTerm})`, "gi"));
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span
        key={index}
        style={{
          backgroundColor: "yellow",
          textDecoration: "line-through",
          fontWeight: "bold",
        }}
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPortfolios, setFilteredPortfolios] = useState(portfolioList);

  // Function to handle search input changes
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    filterPortfolios(term);
  };

  // Function to filter portfolios based on search term
  const filterPortfolios = (term) => {
    if (term === "") {
      setFilteredPortfolios(portfolioList);
      return;
    }

    const filtered = portfolioList.filter((portfolio) =>
      portfolio.name.toLowerCase().includes(term) ||
      portfolio.description.toLowerCase().includes(term) ||
      portfolio.investor.firstname.toLowerCase().includes(term) ||
      portfolio.investor.lastname.toLowerCase().includes(term) ||
      portfolio.categories.some((category) =>
        category.name.toLowerCase().includes(term) ||
        category.description.toLowerCase().includes(term) ||
        category.stocks.some((stock) =>
          stock.name.toLowerCase().includes(term) ||
          stock.note.toLowerCase().includes(term)
        )
      )
    );

    setFilteredPortfolios(filtered);
  };

  return (
    <Grid  item xs={12} sm={8} md={9} lg={10}>
      <TextField
        fullWidth
        label="Search Portfolios"
        value={searchTerm}
        onChange={handleSearch}
        variant="outlined"
        margin="normal"
      />
      <Grid container spacing={2}>
        {filteredPortfolios.map((portfolio) => (
          <Grid item xs={12} sm={6} md={4} key={portfolio.id}>
            <Link to={`/home/portfolios/${portfolio.id}`} style={{ textDecoration: 'none' }}>
              <Card style={{ cursor: 'pointer' }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    {highlightText(portfolio.name, searchTerm)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {highlightText(portfolio.description, searchTerm)}
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    Investor: {highlightText(portfolio.investor.firstname, searchTerm)} {highlightText(portfolio.investor.lastname, searchTerm)}
                  </Typography>
                  <Typography variant="subtitle2" color="text.secondary">
                    Creation Price: {portfolio.creationPrice}
                  </Typography>
                  {portfolio.categories.map((category) => (
                    <div key={category.id}>
                      <Typography variant="h6">
                        {highlightText(category.name, searchTerm)}
                      </Typography>
                      <Typography variant="body2">
                        {highlightText(category.description, searchTerm)}
                      </Typography>
                      <ul>
                        {category.stocks.map((stock) => (
                          <li key={stock.id}>
                            <strong>{highlightText(stock.name, searchTerm)}</strong> - {highlightText(stock.note, searchTerm)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SearchPage;
