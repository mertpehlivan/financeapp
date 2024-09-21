import React, { useState } from "react";
import { Container, TextField, Button, Typography, Link, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { investors } from "../service/portfolioList";  // investors verisi

const RegisterPage = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    const existingUser = investors.find((inv) => inv.email === email);

    if (existingUser) {
      // Kullanıcı zaten var
      setError("Email already in use.");
    } else {
      // Yeni kullanıcı oluştur
      const newInvestor = {
        id: investors.length + 1,
        firstname,
        lastname,
        email,
        password,
      };
      investors.push(newInvestor);

      // Kullanıcıyı localStorage'a kaydet
      localStorage.setItem("loggedInUser", JSON.stringify(newInvestor));
      navigate(`/profile/${newInvestor.id}`);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Register
        </Typography>

        {error && (
          <Typography variant="body2" color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
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
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login here
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
