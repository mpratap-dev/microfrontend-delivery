import * as yup from "yup";
import moment from "moment";

export const hubValidationSchema = yup.object({
  clientId: yup
    .string()
    .required("Please select a client"),

  name: yup.string().required("Hub name is required"),

  hubLocation: yup.object({
    lat: yup
      .number()
      .min(-90, "Latitude must be a number between -90 to 90")
      .max(90, "Latitude must be a number between -90 to 90")
      .required("Latitude is required"),
  
    lon: yup
      .number()
      .min(-180, "Longitude must be a number between -180 to 180")
      .max(180, "Longitude must be a number between -180 to 180")
      .required("Longitude is required"),
  }),

  address: yup.string().required("Address is required"),

  contactInfo: yup.array().of(yup.object().shape({
    type: yup.string(),
    name: yup.string().matches(/\w$/, "Please enter a valid name"),
    number: yup
    .string()
    .test("invalid-input", "Please enter both name & number, or leave both empty", function(value) {
      const { name } = this.parent;
      return !((name && !value) || (value && !name));
    })
    .matches(/^[5-9]\d{9}$/, "Please enter a valid contact number")
  })),
});

export const slotsValidationSchema = yup.object({
  addClientHubSlotModel: yup.array().of(yup.object().shape({
    name: yup.string().matches(/\w$/, "Please enter a valid name").required("Please enter a valid name"), 
    slotStartTime: yup.string().required('Please enter start time'),
    slotEndTime: yup.string().required("Please enter end time")
    .test("is-greater", "this should be greater than start time", function(value) {
      const { slotStartTime } = this.parent;
      return moment(value, "HH:mm").isAfter(moment(slotStartTime, "HH:mm"));
    }),
  }))
});

