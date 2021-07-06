import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles({
  button: {
    textDecoration: "none",
  },
});

const LinkButton = (props) => {
  const { to, children, iconButton, className } = props;
  const btnProps = {...props};
  const classes = useStyles();

  delete btnProps.iconButton;
  delete btnProps.to;

  return (
    <Link to={to} className={`${classes.button} ${className}`}>
      {
        !!iconButton 
          ? (<IconButton {...btnProps}>{children}</IconButton>) 
          : <Button {...btnProps}>{children}</Button>
      }
    </Link>
  );
};

export default LinkButton;
