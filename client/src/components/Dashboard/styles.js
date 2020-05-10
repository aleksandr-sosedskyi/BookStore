import { makeStyles } from "@material-ui/core/styles";
const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      width: `calc(100vw - ${drawerWidth})`,
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        width: "100vw"
      }
    },
}));

export default useStyles;