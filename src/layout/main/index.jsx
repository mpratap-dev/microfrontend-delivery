import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    zIndex: 2,
    boxShadow: '0 0 10px rgb(0 0 0 / 30%)',
    borderRadius: '25px 0 0 25px',
    padding: theme.spacing(4),
    marginLeft: -1
  }
}))

const Main = (params) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper} elevation={6}>
      Main
    </Paper>
  )
}

export default Main;
