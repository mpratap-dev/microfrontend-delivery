import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import { Button } from "@material-ui/core";
import useSpacing from "../../../hooks/useSpacing";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import If from "@oyerickshaw/common.ui.if";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  input: {
    fontSize: "14px",
  },
  label: {
    background: "#EEE",
    padding: "4px 10px",
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #EEE",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid #AAA",
    },
  },
  flex: {
    display: "flex",
  },
  buttons: {
    minWidth: 28,
  },
  btnIcon: {
    fontSize: "0.875rem",
    display: "inline-block",
  },
}));

const InlineEditInput = (props) => {
  const classes = useStyles();
  const spacing = useSpacing();
  const { value, inputProps, handleChange } = props;
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState({
    temp: value,
    final: value,
  });

  const onInputChange = (event) => {
    const currentValue = event.target.value;
    setInputValue({ ...inputValue, temp: currentValue });
  };

  const handleSubmit = () => {
    typeof handleChange === "function" && handleChange(inputValue.temp);
    setInputValue({ ...inputValue, final: inputValue.temp });
    setEditMode(false);
  };

  const cancelEdit = () => {
    setEditMode(false);
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  return (
    <>
      <If
        condition={editMode}
        defaultCase={
          <div className={classes.label} onClick={openEditMode}>
            <span>{inputValue.final}</span>
            <EditIcon
              fontSize="small"
              className={`${classes.btnIcon} ${spacing.ml3}`}
            />
          </div>
        }
      >
        <div className={classes.flex}>
          <Input
            {...inputProps}
            defaultValue={inputValue.final}
            className={classes.input}
            onChange={onInputChange}
          />
          <Button
            variant="contained"
            size="small"
            className={`${classes.buttons} ${spacing.mr2}`}
            onClick={handleSubmit}
          >
            <CheckIcon fontSize="small" className={classes.btnIcon} />
          </Button>
          <Button
            variant="contained"
            size="small"
            className={classes.buttons}
            onClick={cancelEdit}
          >
            <ClearIcon fontSize="small" className={classes.btnIcon} />
          </Button>
        </div>
      </If>
    </>
  );
};

InlineEditInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
};

export default InlineEditInput;
