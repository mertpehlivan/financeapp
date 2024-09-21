import React, { useState } from "react";
import { Container, TextField, Button, Typography, Link, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { investors } from "../service/portfolioList";  // investors verisi

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const investor = investors.find((inv) => inv.email === email && inv.password === password);

    if (investor) {
      // Kullanıcı bulundu, giriş başarılı, bilgileri localStorage'a kaydet
      localStorage.setItem("loggedInUser", JSON.stringify(investor));
      navigate(`/home/investors/${investor.id}`);
    } else {
      // Hatalı giriş
      setError("Invalid email or password.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link href="/register" underline="hover">
            Register here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
