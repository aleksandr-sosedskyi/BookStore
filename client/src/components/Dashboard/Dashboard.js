import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import Navbar from "../Navbar/Navbar";
import { connect } from "react-redux";
import { getGenres } from "../../actions/genres";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import { CATALOG } from "../../constants/routes";

const Dashboard = (props) => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const currentGenreId = props.currentGenreId;
  const bookId = props.bookId;
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Typography className='mt-3 mb-3' align="center" variant="h5" component="h5">
        Жанры
      </Typography>
      <Divider />
      <List component="nav" aria-label="secondary mailbox folder">
        <Link to={`${CATALOG}/all/`} className={classes.genreLink}>
          <ListItem
            button
            selected={currentGenreId === 'all'}
          >
            <ListItemText primary={`Все жанры`} />
          </ListItem>
        </Link>
        {props.genres.map((genre, index) => (
          <Link to={`${CATALOG}/${genre.id}`} className={classes.genreLink}>
            <ListItem
              button
              selected={currentGenreId == genre.id}
            >
              <ListItemText primary={`${genre.name}`} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  
  useEffect(() => {
    props.getGenres();
  }, [props.genres.join(',')])

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar handleDrawerToggle={handleDrawerToggle} />
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <props.mainComponent 
        currentGenreId={currentGenreId} 
        bookId={bookId}
        />
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  genres: state.genres.genres
})

export default connect(mapStateToProps, {getGenres} )(Dashboard);