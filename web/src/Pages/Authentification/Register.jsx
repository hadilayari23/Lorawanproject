import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constants';
import Cookies from 'universal-cookie';



function Copyright(props) {

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Smart_team
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();



const Register = () => {
  
  const cookies = new Cookies();
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // axios.get(url,params)
    const response = await fetch(`${path}user/register`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
          nom: data.get('nom'),
          prenom: data.get('prenom'),
          tel: data.get('tel'),
          adress: data.get('adress'),
          birthdate: data.get('date'),
        })
      }
    );

    let result = await response.json();
    // console.log(result);
    if (result.message === 'success') {
      swal(
        "Success!",
        "Welcome to our world",
        "success"
      );
      let auth = JSON.stringify(result.data);
      cookies.set('user', auth);
      navigate('/');
    } else {
      swal(
        "Error!",
        "Check your credentials",
        "error"
      );
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* nom + prenom /////////////////////////// */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="nom"
                  required
                  fullWidth
                  id="nom"
                  label="Nom"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="prenom"
                  label="Prenom"
                  name="prenom"
                  autoComplete="family-name"
                />
              </Grid>

              {/* email///////////// */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              
              {/* birthdate */}
              <Grid item xs={12} sm={6}>
                <TextField
                  type='date'
                  required
                  fullWidth
                  id="date"
                  // label="Email Address"
                  name="date"
                  autoComplete="date"
                />
              </Grid>

              {/* tel + sexe ////////////////////// */}
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="phone number"
                  name="tel"
                  required
                  fullWidth
                  id="tel"
                  label="Numero de telephone"
                  autoFocus
                />
              </Grid>
              
              
              
              {/* email///////////// */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="adress"
                  label="Adresse"
                  name="adress"
                  autoComplete="adress"
                />
              </Grid>

              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              {/* <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid> */}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}



export default Register