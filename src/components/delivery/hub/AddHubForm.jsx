import React, { useState, useEffect } from "react";
import { hubValidationSchema } from "./hubFormSchema";
import { useFormik, getIn } from "formik";
import { addHubs, fetchHubDetails, editHub } from "../../../api/delivery";
import LinkButton from "../../common/link-button";
import { resetFields } from "../../../utils/form-handler";
import {
  contactDetailsFields,
  hubDetailsFields,
  SPOCField,
} from "./hubDetails/fields";
import HubDetails from "./hubDetails/HubDetails";
import ContactDetails from "./hubDetails/ContactDetails";
import CircularProgress from "@material-ui/core/CircularProgress";
import SendIcon from "@material-ui/icons/Send";
import useSpacing from "../../../hooks/useSpacing";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { CONTACT_INFO_TYPES } from "../../../constant/delivery";
import Backdrop from "@material-ui/core/Backdrop";
import { useDispatch } from "react-redux";
import { showGlobalMessage } from "../../../store/actions";
import If from "../../common/if";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
  },
  backdrop: {
    zIndex: 1,
    color: "#fff",
    position: "absolute",
  },
}));

const { HUB_POC, TRAINER, OYE_HUB_MANAGER, OYE_NINJA } = CONTACT_INFO_TYPES;

const AddHubForm = ({ showMessage, clientHubId, isSlotsRoute }) => {
  const [SPOCFields, setSPOCFields] = useState([{ id: 0 }]);
  const [selectedOption, setClient] = useState({});
  const [isLoading, setLoading] = useState(false);
  const spacing = useSpacing();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const initialValues = {
    clientId: "",
    name: "",
    hubLocation: {
      lat: "",
      lon: "",
    },
    address: "",
    contactInfo: [
      { type: OYE_HUB_MANAGER, name: "", number: "" },
      { type: OYE_NINJA, name: "", number: "" },
      { type: TRAINER, name: "", number: "" },
      { type: HUB_POC, name: "", number: "" },
    ],
  };

  const fieldsMapping = {
    OYE_HUB_MANAGER: 0,
    OYE_NINJA: 1,
    TRAINER: 2,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    try {
      const { clientId, name, address, hubLocation, contactInfo } = values;
      let data = {
        clientId,
        name,
        address,
        contactInfo: contactInfo.filter(
          (each) => !!each && (each.name || each.number)
        ),
        hubLocation,
      };

      const submitAPI = clientHubId ? editHub : addHubs;

      const {
        status,
        message,
        data: { id } = {},
      } = await submitAPI({ id: clientHubId, data });

      if (status) {
        dispatch(
          showGlobalMessage({
            text: `Hub ${clientHubId ? "updated" : "added"} successfully`,
            type: "success",
          })
        );

        resetForm();
        if (!clientHubId) {
          history.push(`/delivery/hubs/create/${id}/slots`);
        } else {
          history.push(`/home/dashboard/delivery/hubs`);
        }
      } else {
        showMessage({ type: "error", text: message });
      }
    } catch (error) {
      const message = error.response.data.message;
      showMessage({ type: "error", text: message });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    resetFields({
      fields: [...hubDetailsFields, ...contactDetailsFields, ...SPOCField].map(
        (each) => each.name
      ),
      formik,
    });
    setSPOCFields([{ id: 0 }]);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: hubValidationSchema,
    onSubmit: handleSubmit,
  });

  const createSPOCFields = (totalFields) => {
    const fieldsToAppend = Array(totalFields - 1)
      .fill()
      .map((each, index) => ({ id: index + 1 }));

    if (fieldsToAppend.length) {
      setSPOCFields([...SPOCFields, ...fieldsToAppend]);
    }
  };

  const prefillSPOCFields = ({ contactInfo }, totalFields) => {
    !totalFields && formik.setFieldValue("contactInfo[3][type]", HUB_POC);

    const SPOCFieldValues = contactInfo.filter((each) => each.type === HUB_POC);
    const otherContacts = contactInfo.filter((each) => each.type !== HUB_POC);

    otherContacts.forEach(({ type }, index) => {
      const fieldData = contactInfo.find((each) => each.type === type);
      formik.setFieldValue(`contactInfo[${fieldsMapping[type]}]`, fieldData);
    });

    SPOCFieldValues.forEach(({ type, name, number }, index) => {
      formik.setFieldValue(`contactInfo[${index + 3}][type]`, type);
      formik.setFieldValue(`contactInfo[${index + 3}][name]`, name);
      formik.setFieldValue(`contactInfo[${index + 3}][number]`, number);
    });
  };

  const preFillForm = (data) => {
    const { contactInfo, clientName } = data;
    const totalFields = contactInfo.filter(
      (each) => each.type === HUB_POC
    ).length;

    Object.keys(initialValues).forEach((key) => {
      if (!data[key]) return;

      if (key === "clientId" && clientName) {
        setClient({ id: data[key], name: clientName });
      }

      // !Following order of statements must remain intact
      totalFields > 1 && createSPOCFields(totalFields);
      key !== "contactInfo" && formik.setFieldValue(key, data[key]);
      key === "contactInfo" && prefillSPOCFields(data, totalFields);
    });
  };

  const getHubDetails = async () => {
    if (clientHubId && !isSlotsRoute) {
      setLoading(true);
      const { status, data } = await fetchHubDetails(clientHubId);

      if (status) {
        preFillForm(data);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getHubDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientHubId]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={classes.container}
      noValidate
    >
      <Backdrop className={classes.backdrop} open={!!isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <HubDetails
        formik={formik}
        getIn={getIn}
        selectedClient={selectedOption}
        clientHubId={clientHubId}
      />

      <ContactDetails
        formik={formik}
        getIn={getIn}
        SPOCFields={SPOCFields}
        setSPOCFields={setSPOCFields}
      />

      <Button
        variant="contained"
        type="submit"
        color="primary"
        startIcon={
          formik.isSubmitting ? (
            <CircularProgress color="inherit" size={16} />
          ) : (
            <SendIcon />
          )
        }
      >
        Submit
      </Button>
      <LinkButton
        to="/home/dashboard/delivery/hubs"
        variant="contained"
        className={spacing.ml4}
      >
        Goto hubs listing
      </LinkButton>
    </form>
  );
};

export default AddHubForm;
