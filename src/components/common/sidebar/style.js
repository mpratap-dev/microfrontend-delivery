import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    paddingLeft: 10,
    paddingTop: 15
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  paper: {
    position: 'relative',
    height: 'calc(100vh - 79px)',
    backgroundColor: theme.palette.primary.main,
    overflow: 'hidden'
  },
  listItem: {
    color: '#fff',
  },
  bold: {
    fontWeight: 'bold'
  },
  navLinks: {
    opacity: 0.5,
    display: 'block',
    textDecoration: 'none',

    '&.selected': {
      opacity: 1,
      background: '#fff',
      borderRadius: '25px 0 0 25px',

      '& $listItem': {
        color: theme.palette.primary.main
      }
    },
  },
  hamburger: {
    position: 'absolute',
    bottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: -15,
    width: 'calc(100% + 15px)'
  }
}));

export default useStyles;