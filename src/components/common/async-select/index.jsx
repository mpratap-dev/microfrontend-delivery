import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { debounce } from "lodash";
import CircularProgress from "@material-ui/core/CircularProgress";

const AsyncSelect = (props) => {
  const {
    id,
    api,
    label,
    size,
    className,
    disabled,
    format: { key = "id", text = "name" },
    dataKey,
    onChange,
    name,
    required,
    style = { width: 250 },
    error,
    value,
    helperText = "Enter atleast 3 characters",
    onInputChange,
    defaultValue,
  } = props;

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setValue] = useState(defaultValue || {});

  const getData = async (searchVal) => {
    try {
      const { status, data } = await api(searchVal);
      if (status) {
        setOptions(data[dataKey]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    event.target.name = name;
    event.target.value = newValue ? newValue[key] : "";
    setValue(newValue);
    typeof onChange === "function" && onChange(event, newValue);
    typeof onInputChange === "function" && onInputChange(event);
  };

  const debouceSearch = debounce(getData, 500);

  const handleInputChange = (event, searchVal) => {
    if (open && searchVal && searchVal.length > 2) {
      setLoading(true);
    }
    if (searchVal && searchVal.length > 2) {
      debouceSearch(searchVal);
    }
  };

  useEffect(() => {
    !open && setOptions([]);
  }, [open]);

  useEffect(() => {
    if (!value) {
      setValue({});
    } else if (key === text) {
      setValue({ [key]: value, [text]: value });
    } else if (value && typeof value === "object") {
      setValue(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  return (
    <Autocomplete
      id={id}
      style={style}
      className={className}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionSelected={(option, value) => option[text] === value[text]}
      getOptionLabel={(option) => option[text] || ""}
      options={options}
      name={name}
      value={selectedValue}
      size={size || "small"}
      disabled={disabled}
      loading={loading}
      onChange={handleChange}
      onInputChange={handleInputChange}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="outlined"
          required={required}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default AsyncSelect;
