import React from "react";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import useSpacing from "../../../../hooks/useSpacing";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import If from "../../../common/if";


const SlotDetails = ({ formik, getIn, slotFields, setSlotFields, editSlotMode, slots }) => {
  const spacing = useSpacing();

  const addSlotFields = () => {
    const slotsCount = slotFields.length;
    setSlotFields([ ...slotFields, { id: slotsCount } ]);
    formik.setFieldValue(`addClientHubSlotModel[${slotsCount}][name]`, '');
    formik.setFieldValue(`addClientHubSlotModel[${slotsCount}][slotStartTime]`, '');
    formik.setFieldValue(`addClientHubSlotModel[${slotsCount}][slotEndTime]`, '');
  };

  const deleteFields = (id) => {
    const updatedValues = formik.values.addClientHubSlotModel.filter((each, index) => index !== id);
    setSlotFields(slotFields.filter((field) => field.id !== id));
    formik.setFieldValue(`addClientHubSlotModel`, updatedValues);
    formik.setTouched({[`addClientHubSlotModel[${id}]`]: false});
  };

  return (
    <Paper className={`${spacing.pa4} ${spacing.mb4}`}>

      <If 
        condition={!editSlotMode || slots.length}
        defaultCase="No slots available"
      >
        <Typography variant="subtitle2" className={spacing.mb2} color="primary">
          Slot details
        </Typography>
        {slotFields.map(({ id }, index) => {
          const name = `addClientHubSlotModel[${index}][name]`;
          const startTime = `addClientHubSlotModel[${index}][slotStartTime]`;
          const endTime = `addClientHubSlotModel[${index}][slotEndTime]`;
          const errorName = getIn(formik.errors, name);
          const touchName = getIn(formik.touched, name);
          const errorStartTime = getIn(formik.errors, startTime);
          const touchStartTime = getIn(formik.touched, startTime);
          const errorEndTime = getIn(formik.errors, endTime);
          const touchEndTime = getIn(formik.touched, endTime);

          const { value: nameValue } = formik.getFieldProps(name);
          const { value: startTimeValue } = formik.getFieldProps(startTime);
          const { value: endTimeValue } = formik.getFieldProps(endTime);
          
          return (
            <Grid container spacing={2} key={id} className={spacing.mt2}>
              <Grid item sm={4}>
                <FormControl fullWidth variant="filled" key={index}>
                  <TextField
                    variant="outlined"
                    size="small"
                    id={`slot_name_${id}`}
                    label="Slot name"
                    name={name}
                    value={nameValue}
                    onChange={formik.handleChange}
                    error={touchName && Boolean(errorName)}
                    helperText={touchName && errorName}
                  />
                </FormControl>
              </Grid>

              <Grid item sm={7} className={spacing.pr0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="filled" key={index}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        id={`slot_start_${id}`}
                        label="Start time"
                        name={startTime}
                        value={startTimeValue}
                        onChange={formik.handleChange}
                        error={touchStartTime && Boolean(errorStartTime)}
                        helperText={touchStartTime && errorStartTime}
                        type="time"
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth variant="filled" key={index}>
                      <TextField
                        InputLabelProps={{
                          shrink: true,
                        }}
                        variant="outlined"
                        size="small"
                        id={`slot_end_${id}`}
                        label="End time"
                        name={endTime}
                        value={endTimeValue}
                        onChange={formik.handleChange}
                        error={touchEndTime && Boolean(errorEndTime)}
                        helperText={touchEndTime && errorEndTime}
                        type="time"
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={1}>
                <If condition={!!index && !editSlotMode}>
                  <IconButton
                    disabled={slotFields.length < 2}
                    onClick={() => deleteFields(id)}
                    aria-label="delete"
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </If>
              </Grid>
            </Grid>
        )})}
      </If>

      <If condition={!editSlotMode}>
        <Button 
          variant="contained" 
          onClick={addSlotFields} 
          color="primary" 
          size="small" 
          startIcon={<AddCircleIcon />}
          className={spacing.mt4}
        >
          Add Slot
        </Button>
      </If>
    </Paper>
  );
};

export default SlotDetails;
