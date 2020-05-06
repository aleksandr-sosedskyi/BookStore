import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up('sm')] : {
        display: "block",
      }
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'flex',
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    loginModalCard: {
      position: 'absolute',
      width: '90%',
      maxWidth: '400px',
      top: '50%',
      left: '50%',
      transform: "translate(-50%, -50%)",
    },
    signButtons: {
      backgroundColor: '#d2d8d8',
      padding: "1rem 1rem",
      width:'50%',
      display: 'block',
      border: 'none',
    },
    forgotPasswordText: {
      fontSize: "0.74rem",
      marginTop: "1rem",
      opacity: '0.85',
      cursor: "pointer"
    },
    loginModalTextInputs : {
      margin: theme.spacing(1),
      width: "80%"
    },
    opacity: {
      opacity:0.4
    },
    errorMessage: {
      marginBottom: "0px",
      color: "red",
      fontSize: "0.9rem"
    }
  }));

export default useStyles;