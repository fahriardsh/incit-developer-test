import React, { useCallback, useRef, useMemo, useState, useEffect } from 'react';
// import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import SettingsApplicationsRoundedIcon from '@mui/icons-material/SettingsApplicationsRounded';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import sidebarImage from '../img/sidebar-image.png';
import menPhoto from '../img/men-photo.png';
import homeIcon from '../img/home-icon.png';
import popshop from '../img/popshop.png';
// import popshopIcon from '../img/popshop-icon.png';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
// import HomeIcon from '@mui/icons-material/Home';
// import WhatshotIcon from '@mui/icons-material/Whatshot';
// import GrainIcon from '@mui/icons-material/Grain';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';
import { AgGridReact } from "ag-grid-react";
import { ColDef } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const drawerWidth = 260;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  margin: 12,
  borderRadius: 16,
  border: 0,
  boxShadow: '0px 27px 25px rgba(0, 0, 0, 0.05)'
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  margin: 12,
  borderRadius: 16,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  // boxShadow: 'none',
  // background: 'transparent',
  // color: '#6D6E71',
  margin: 32,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 80}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);



export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const gridRef = useRef(); // Optional - for accessing Grid's API
  // const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row

  function currencyFormatter(currency, sign) {
    var sansDec = currency.toFixed(0);
    var formatted = sansDec.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return sign + `${formatted}`;
  }

  const [columnDefs, setColumnDefs] = useState([
    
    { 
      field: 'image', 
      headerName: 'LOGO', 
      width: 100,
      cellRenderer: (params) => 
        <div>
          <React.Fragment>
            <img src={params.value} style={{height: 40}}/>
          </React.Fragment>
        </div>  
    },
    {field: 'name', headerName: 'NAME', flex: 3},
    {
      field: 'current_price', 
      headerName: 'CURRENT PRICE', 
      flex: 1,
      valueFormatter: params => currencyFormatter(params.value, '$'),
    },
    {
      field: 'market_cap', 
      headerName: 'MARKET CAP', 
      flex: 1,
      valueFormatter: params => currencyFormatter(params.value, '$'),
    }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
      sortable: true
    }));

  let sampleDataCrypto = require('../response_1686697784759.json');

  const [dataCrypto, setDataCrypto] = useState([])
  useEffect(() => {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&locale=en')
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          setDataCrypto(data);
      })
      .catch((err) => {
          setDataCrypto(sampleDataCrypto);
      });
  }, []);


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader style={{justifyContent: 'center'}}>
          <img src={popshop}></img>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton> */}
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Setting'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block', fontWeight: 500, color: '#6D6E71' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center'
                  }}
                >
                  {index % 2 === 0 ? <GridViewRoundedIcon /> : <SettingsApplicationsRoundedIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        
        <Card sx={{ margin: 2, justifyContent: 'center', height: '155px', borderRadius: 5, marginTop: 'auto'}}>
          <div className="background-sidebar-image">
            <div className="box-sidebar-image">
              <QuestionMarkRoundedIcon style={{display: 'fixed', borderRadius: 10, width: 35, height: 35, padding: 10, opacity: 1, color: '#49994D', background: '#fff'}}/>
              <br></br>
              <h4 style={{color: '#FFF', fontWeight: 600, margin: 0}}>Need Help?</h4>
              <h5 style={{color: '#FFF', fontWeight: 600, margin: 0}}>Please Reach on</h5>
              <button className="Details-btn" style={{}}>DETAILS</button>

            </div>
            {/* <QuestionMarkRoundedIcon style={{display: 'fixed', borderRadius: 10, width: 40, height: 40, padding: 8, opacity: 1, color: '#49994D', background: '#fff'}}/> */}


          </div>
        </Card>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, pt: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{display: 'flex', alignItems: 'center', paddingLeft: 30}}>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2, borderRadius: 100, background: '#3E76FF', color: '#FFF'  }}
              >
                <MenuIcon />
            </IconButton>
            <Breadcrumbs aria-label="breadcrumb" >
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href="/dashboard"
              >
                <img src={homeIcon} sx={{ mr: 0.5 }}></img>
              </Link>
              <Typography
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                Dashboard
              </Typography>
            </Breadcrumbs>
            <div style={{marginLeft: 'auto'}}>
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  // aria-controls={menuId}
                  aria-haspopup="true"
                  // onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <img src={menPhoto} style={{ borderRadius: 100, height: 30 }}></img>
                </IconButton>
                <h5 style={{color: '#6D6E71', fontWeight: 500, paddingLeft: 8}}>James</h5>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={17} color="error">
                    <NotificationsIcon />
                    
                  </Badge>
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  // aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  // onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </div>  
          </Grid>
          <Grid item xs={12} style={{textAlign: 'left'}}>
            {/* <Card sx={{ padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}> */}
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}>
              <img src={menPhoto} style={{ borderRadius: 8 }}></img>
              <div>
                <h3 style={{color: '#323A46', fontWeight: 500, paddingLeft: 10, margin: 0}}>James Warden</h3>
                <h5 style={{color: '#6D6E71', fontWeight: 500, paddingLeft: 10, margin: 0}}>Admin - Company</h5>
              </div>
            </Card>
          </Grid>
          <Grid item xs={4} style={{textAlign: 'left'}}>
            {/* <Card sx={{ padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}> */}
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}>
              <div>
                <h4 style={{color: '#6D6E71', fontWeight: 500, paddingLeft: 10, margin: 0}}>Crypto Paid</h4>
                <h3 style={{color: '#3E76FF', fontWeight: 700, paddingLeft: 10, margin: 0}}>20</h3>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <BarChartRoundedIcon style={{borderRadius: 5, width: 50, height: 50, padding: 16, color: '#FFF', background: 'linear-gradient(310deg, #3E76FF 0%, #79A0FF 100%)', boxShadow: '0px 4px 6px -1px rgba(20, 20, 20, 0.12), 0px 2px 4px -1px rgba(20, 20, 20, 0.07)'}}/>
              </div>

              {/* <div style={{float: 'right'}}>
                <BarChartRoundedIcon />
              </div> */}
            </Card>
          </Grid>
          <Grid item xs={4} style={{textAlign: 'left'}}>
            {/* <Card sx={{ padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}> */}
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}>
              <div>
                <h4 style={{color: '#6D6E71', fontWeight: 500, paddingLeft: 10, margin: 0}}>Crypto In Progress</h4>
                <h3 style={{color: '#9F9F9F', fontWeight: 700, paddingLeft: 10, margin: 0}}>20</h3>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <BarChartRoundedIcon style={{borderRadius: 5, width: 50, height: 50, padding: 16, color: '#FFF', background: 'linear-gradient(310deg, #9B9B9B 0%, #B0B0B0 100%)', boxShadow: '0px 4px 6px -1px rgba(20, 20, 20, 0.12), 0px 2px 4px -1px rgba(20, 20, 20, 0.07)'}}/>
              </div>

              {/* <div style={{float: 'right'}}>
                <BarChartRoundedIcon />
              </div> */}
            </Card>
          </Grid>
          <Grid item xs={4} style={{textAlign: 'left'}}>
            {/* <Card sx={{ padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}> */}
            <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)'}}>
              <div>
                <h4 style={{color: '#6D6E71', fontWeight: 500, paddingLeft: 10, margin: 0}}>Crypto Unpaid</h4>
                <h3 style={{color: '#D62424', fontWeight: 700, paddingLeft: 10, margin: 0}}>2</h3>
              </div>
              <div style={{marginLeft: 'auto'}}>
                <BarChartRoundedIcon style={{borderRadius: 5, width: 50, height: 50, padding: 16, color: '#FFF', background: 'linear-gradient(310deg, #CF0808 0%, #FFCCCC 100%)', boxShadow: '0px 4px 6px -1px rgba(20, 20, 20, 0.12), 0px 2px 4px -1px rgba(20, 20, 20, 0.07)'}}/>
              </div>

              {/* <div style={{float: 'right'}}>
                <BarChartRoundedIcon />
              </div> */}
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{padding: 2, borderRadius: 2, boxShadow: '0px 20px 27px rgba(0, 0, 0, 0.05), inset 0px 0px 1px 1px rgba(255, 255, 255, 0.9)', borderTop: '5px solid #3E76FF'}}>
              <div style={{display: 'flex'}}>
                <h3 style={{color: '#323A46', fontWeight: 500, paddingLeft: 10, margin: 0}}>Cryptocurrencies</h3>
                <FormControl sx={{ m: 0, width: '35ch', marginLeft: 'auto' }} variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-search"
                    placeholder='Search'
                    startAdornment={
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    }
                    style={{border: '1px solid #BDBCBC', borderRadius: 8}}
                  />
                </FormControl>
              </div>
              <div className="ag-theme-material" style={{width: '100%', height: 600}}>
                <AgGridReact
                  ref={gridRef} // Ref for accessing Grid's API

                  rowData={dataCrypto} // Row Data for Rows

                  columnDefs={columnDefs} // Column Defs for Columns
                  defaultColDef={defaultColDef} // Default Column Properties
                  pagination={true}
                  paginationPageSize={10}
                  animateRows={true} // Optional - set to 'true' to have rows animate when sorted

                  />
              </div>
            </Card>
            
          </Grid>

        </Grid>
        
      </Box>
    </Box>
  );
}