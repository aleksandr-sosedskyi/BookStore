import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { CATALOG } from "../../constants/routes";
import useStyles from "./styles";
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";
import LoginModal from "./LoginModal";

const Navbar = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signType, setSignType] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginModal = (state, type=null) => {
    handleMenuClose();
    setLoginModalOpen(state);
    setSignType(type);
  }

  const handleChangeSignType = (type) => {
    setSignType(type);
  }

  const handleLogout = () => {
    handleMenuClose();
    setLoginModalOpen(false);
    props.logout();
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {props.isAuthenticated ? (
          <div>
            <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            <MenuItem onClick={handleLogout}>Выход</MenuItem>
          </div>
        ):
        (
          <div>
            <MenuItem onClick={() => handleLoginModal(true, 'signIn')}>Войти</MenuItem>
            <MenuItem onClick={() => handleLoginModal(true, 'signUp')}>Регистрация</MenuItem>
          </div>
        )}
        
      </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar style={{backgroundColor: '#1a1a1a'}} position="static">
        <Toolbar>
          <Link 
            to={CATALOG}
            style={{
              textDecoration:"none",
              color: "white",
              font: "inherit"
            }}
          >
            <img 
              style={{width:'25px', height:'20px'}} 
              src={process.env.PUBLIC_URL + 'nure.png'} 
              className='mr-3'
            />
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link 
              to={CATALOG}
              style={{
                textDecoration:"none",
                color: "white",
                font: "inherit"
              }}
            >
              E-Book
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.isAuthenticated && (
              <IconButton aria-label="shopping cart" color="inherit">
                <ShoppingCartIcon />
              </IconButton>
            )}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <LoginModal 
      open={props.isAuthenticated ? false : loginModalOpen} 
      handleLoginModal={handleLoginModal} 
      classes={classes}
      signType={signType}
      handleChangeSignType={handleChangeSignType}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(Navbar);