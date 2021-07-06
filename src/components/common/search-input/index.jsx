import React from "react";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: ({ width, size }) => {
    const inputPadding = size === "large" ? 2 : 1;
    return {
      padding: theme.spacing(inputPadding, inputPadding, inputPadding, `calc(1em + ${theme.spacing(4)}px)`),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: `${width}ch`,
        "&:focus": {
          width: `${width + 5}ch`,
        },
      },
    };
  },
}));

const SearchInput = ({ handleInputClick, handleSearch, value, width=20,  placeholder="Search...", size = 'small' }) => {
  const classes = useStyles({width, size});
  const inputProps = {
    "aria-label": "search",
    onChange: handleSearch,
    value
  }

  if(handleInputClick) {
    inputProps.onClick = handleInputClick
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder={placeholder}
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={inputProps}
      />
    </div>
  );
};

export default SearchInput;
