import React, { useState, useEffect } from 'react';
import logo from '../img/Left Tilt Transparent 1.png';
import facebookIcon from '../img/facebook-icon.png';
import appleIcon from '../img/apple-icon.png';
import googleIcon from '../img/google-icon.png';
import '../App.css';
import Grid from '@mui/material/Grid'
// import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Alert from '@mui/material/Alert';

function Login() {

    const [showPassword, setShowPassword] = useState(true);

    const [email, setEmail] = useState('@');
    const [loadAlertEmail, setLoadAlertEmail] = useState(false);

    const [password, setPassword] = useState('Test@123');
    const [loadAlertPassword, setLoadAlertPassword] = useState(false);

    // const [showAlertPassword, setShowAlertPassword] = useState(true);
    // const [handleOnChange, setHandleOnChange] = useState(false);

    useEffect(() => {
      let checkEmail = '@';
      if (email.match(checkEmail)){
        setLoadAlertEmail(false)
      } else {
        setLoadAlertEmail(true)
      }
      console.log(email)
    }, [email])

    useEffect(() => {
      let checkPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#~])[A-Za-z\d@$!%*?&#~]{8,}$/;
      if (password.match(checkPassword)){
        setLoadAlertPassword(false)
      } else {
        setLoadAlertPassword(true)
      }
      console.log(password)
    }, [password])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    let handleOnChangeEmail = event => {
      setEmail(event.target.value)
    };

    let handleOnChangePassword = event => {
      setPassword(event.target.value)
    };

  return (
    <div className="Login">
      <section className="Login-section">
        <Grid container spacing={2}>
          <Grid item xs={6} style={{textAlign: 'center'}}>
            <img src={logo} alt="logo" />
          </Grid>
          <Grid item xs={6} style={{textAlign: 'center'}}>
            <h1 style={{margin: 'auto', textAlign: 'left', fontWeight: 500, padding: 8, width: '27ch', }}>Sign in</h1>
            <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
              <OutlinedInput
                id="outlined-adornment-email"
                type="email"
                label="Email"
                onChange={handleOnChangeEmail}
                style={{border: '1px solid #BDBCBC', borderRadius: 8}}
              />
            </FormControl>
            <br></br>
            <br></br>
            <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'password' : 'text'}
                onChange={handleOnChangePassword}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      style={{color: '#3E76FF'}}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                style={{border: '1px solid #BDBCBC', borderRadius: 8}}
              />
            </FormControl>
            {/* <input className='Login-input' type={passwordType} placeholder='Password'></input>
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePassword}
              style={{color: '#3E76FF'}}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton> */}
            <br></br>
            <div style={{margin: 'auto', fontWeight: 400, padding: 8, width: '40ch', justifyContent: 'space-between', display: 'inline-flex'}}>
              {loadAlertEmail && <Alert severity="warning" style={{background: 'transparent', fontWeight: 500, color: '#EA0000'}}>Email Incorrect!</Alert>}
              {loadAlertPassword && <Alert severity="warning" style={{background: 'transparent', fontWeight: 500, color: '#EA0000'}}>Password Incorrect!</Alert>}
              <a href="" style={{textDecoration: 'none', fontWeight: 400, color: '#B0B0B0', fontSize: 13, textAlign: 'right'}}>Forgot Password?</a>
            </div>
            <br></br>
            <br></br>
            <button className='Login-btn'>Login</button>
            <br></br>
            <br></br>
            <br></br>
            <span style={{fontWeight: 400, color: '#B0B0B0', fontSize: 16}}>or continue with</span>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <a href=""><img src={facebookIcon} style={{width: '35px', padding: 8}}></img></a>
            <a href=""><img src={appleIcon} style={{width: '35px', padding: 8}}></img></a>
            <a href=""><img src={googleIcon} style={{width: '35px', padding: 8}}></img></a>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <span style={{fontWeight: 500, fontSize: 16}}>You Don't Have Account?</span> <a href='' style={{fontWeight: 500, fontSize: 16, color: '#3E76FF'}}>Register Here</a>
          </Grid>
        </Grid>
      </section>
    </div>
  );
}

export default Login;
