import * as React from 'react';
import { Link, link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu'
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useState, useEffect } from 'react';
import Axios from 'axios';
const settings = ['Logout'];

function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded .split('; ');
  let res;
  cArr.forEach(val => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
  })
  return res;
}




const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [username, setUserN] = React.useState({});
  const navigate = useNavigate();
  const role = props.role;

  //distroy session

  function delete_cookie() {
    Axios.post("/logout",{
     
    }).then((response)=>{
      navigate('/Home');
      window.location.reload();
    })
  }
  var pages = ['Home', 'Player Registration', 'Club Registration', 'Login'];

  if (username.user=='user') {

    var pages = [''];

  } else {

    if(username.user=='admin'){
      var pages = ['Home', 'Player Registration', 'Club Registration'];

    }else{
      var pages = ['Home', 'Player Registration', 'Club Registration', 'Login'];

    }
  }


  const routeChange = (e) => {
    if (e.target.value == 'Club Registration') {
      navigate('/ClubRegistration');

    }
    else {
      navigate('/mediadata');

    }
  }

  //   useEffect(() => {
    useEffect(()=>{
      Axios.get(`${process.env.REACT_APP_PORT}/login`).then((response)=>{
          if(response){
            
            setUserN(response.data);
            console.log("inside login "+username.user);
          }else{
              alert("not loged in");
          }
            
      })
    },[]);
  // }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page) => {
    setAnchorElNav(null);
    routeChange("./");

    document.cookie="username;max-age=0";
    alert("Cookie1 is deleted"); 
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const f = ()=>{
      if(username.logedIn){
    return (
      <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
         <AccountCircleIcon style={{color:"#ffffff"}} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {
          settings.map((setting) => {
            
              return (
                <MenuItem key={setting} onClick={()=>{
                  delete_cookie();
                      // setUserN("");
                      navigate("/Home");
                }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              )
            
          })
        }

      </Menu>
    </Box>
    );
      }else{
        return "";
      }
    

  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} value={page} onClick={(e) => {
                  if (page == "Club Registration") {
                    navigate('/ClubRegistration');
                  } else {
                    if (page == "Player Registration")
                      navigate('/mediadata');
                    else if (page == "Login")
                      navigate('/login');
                    else
                      navigate('/');

                  }
                }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, marginRight: "2rem" }}
          >
            Substitute Player
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                value={page}
                style={{ color: "#f1f2f1", fontWeight: "100" }}
                onClick={(e) => {
                  if (page == "Club Registration") {
                    navigate('/ClubRegistration');
                  } else {
                    if (page == "Player Registration")
                      navigate('/mediadata');
                    else if (page == "Login")
                      navigate('/login');
                    else
                      navigate('/');
                  }
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {
           f()
          }
          

         


        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
