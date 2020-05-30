import React, { useState, useEffect } from 'react';
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
import { CATALOG, PROFILE } from "../../constants/routes";
import useStyles from "./styles";
import { connect } from 'react-redux';
import { logout } from "../../actions/auth";
import LoginModal from "./LoginModal";
import MenuIcon from '@material-ui/icons/Menu';
import nureImage from '../../static/images/nure.png'
import { SHOPPING_CART } from "../../constants/routes";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { getAllBooks } from "../../actions/books";
import { DETAIL_BOOK, MEDIA_URL } from "../../constants/routes";

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

  useEffect(() => {
    props.getAllBooks();
  }, [props.searchBooks.join(',')]);

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
            <Link className={classes.profileLink} to={PROFILE}>
              <MenuItem onClick={handleMenuClose}>Профиль</MenuItem>
            </Link>
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
          console.log(props);
  return (
    <div className={classes.grow}>
      <AppBar style={{backgroundColor: '#1a1a1a'}} className={classes.appBar} position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Link 
            to={`${CATALOG}/all/`}
            style={{
              textDecoration:"none",
              color: "white",
              font: "inherit"
            }}
          >
            <img 
              style={{width:'25px', height:'20px'}} 
              src={nureImage} 
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
            <div style={{width: "100%", maxWidth:"300px"}}>
              <Autocomplete
                freeSolo
                id="search-input"
                disableClearable
                options={props.searchBooks}
                getOptionLabel={(option) => option.title}
                renderOption={(option) => (
                  <Link 
                  className={classes.searchBookLink} 
                  to={`${DETAIL_BOOK}/${option.id}`}
                  >
                    <img 
                    style={{width: 20, height:30}} 
                    src={`${MEDIA_URL}${option.image}`} 
                    className={classes.searchBookCover + ' mr-3'}
                    />
                    {option.title}
                  </Link>
                )}
                renderInput={(params) => (
                  <InputBase
                  {...params}
                  placeholder='Search...'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput
                  }}
                  ref={params.InputProps.ref}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {props.isAuthenticated && (
              <Link to={SHOPPING_CART}>
                <IconButton aria-label="shopping cart" color="inherit">
                  <ShoppingCartIcon />
                </IconButton>
              </Link>
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
  isAuthenticated: state.auth.isAuthenticated,
  searchBooks: state.books.searchBooks
});

export default connect(mapStateToProps, { logout, getAllBooks })(Navbar);