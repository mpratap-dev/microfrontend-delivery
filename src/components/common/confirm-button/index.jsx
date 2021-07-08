import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import useSpacing from "../../../hooks/useSpacing";
import If from "@oyerickshaw/common.ui.if";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(2),
  },
  typography: {
    marginBottom: theme.spacing(2),
  },
}));

const ConfirmButton = (props) => {
  const {
    children,
    message,
    okText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    onCancel,
    buttonProps,
    loading,
    iconBtn,
  } = props;

  const classes = useStyles();
  const spacing = useSpacing();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    typeof onCancel === "function" && onCancel();
    setAnchorEl(null);
  };

  const handleConfirm = (event) => {
    event.stopPropagation();
    typeof onConfirm === "function" && onConfirm();
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <If
        condition={!!iconBtn}
        defaultCase={
          <Button
            {...buttonProps}
            startIcon={
              loading ? (
                <CircularProgress color="inherit" size={16} />
              ) : (
                buttonProps.startIcon
              )
            }
            onClick={handleClick}
          >
            {children}
          </Button>
        }
      >
        <IconButton {...buttonProps} onClick={handleClick}>
          {loading ? <CircularProgress color="inherit" size={16} /> : children}
        </IconButton>
      </If>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.container}>
          <Typography className={classes.typography}>{message}</Typography>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={handleConfirm}
            className={spacing.mr2}
          >
            {okText}
          </Button>
          <Button size="small" onClick={handleClose}>
            {cancelText}
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default ConfirmButton;
