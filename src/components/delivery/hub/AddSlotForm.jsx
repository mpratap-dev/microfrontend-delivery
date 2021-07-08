import React, { useEffect, useState } from "react";
import { slotsValidationSchema } from "./hubFormSchema";
import { useFormik, getIn } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import SendIcon from "@material-ui/icons/Send";
import { addSlots, editSlots, getSlots } from "../../../api/delivery";
import Slots from "./hubDetails/Slots";
import { Button, Chip } from "@material-ui/core";
import LinkButton from "../../common/link-button";
import useSpacing from "../../../hooks/useSpacing";
import { resetFields } from "../../../utils/form-handler";
import Backdrop from "@material-ui/core/Backdrop";
import useStyles from "../../common/table/styles";
import { SLOT_STATE } from "../../../constant/delivery";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showGlobalMessage } from "../../../store/actions";
import If from "../../common/if";

const { PENDING_APPROVAL, ACTIVE } = SLOT_STATE;

const AddSlotForm = ({ showMessage, clientHubId, editSlotMode }) => {
  const spacing = useSpacing();
  const dispatch = useDispatch();
  const [slotFields, setSlotFields] = useState([{ id: 0 }]);
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const history = useHistory();
  const classes = useStyles();

  const fieldsToReset = [
    "addClientHubSlotModel[0][name]",
    "addClientHubSlotModel[0][slotStartTime]",
    "addClientHubSlotModel[0][slotEndTime]",
  ];

  const initialValues = {
    clientHubId,
    addClientHubSlotModel: [{ name: "", slotStartTime: "", slotEndTime: "" }],
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const submitAPI = editSlotMode ? editSlots : addSlots;
      let body = {};
      if (editSlotMode) {
        body = values.addClientHubSlotModel.filter((each) => !!each);
      } else {
        body = {
          ...values,
          addClientHubSlotModel: values.addClientHubSlotModel.filter(
            (each) => !!each
          ),
        };
      }
      const { status, message } = await submitAPI(body);

      if (status) {
        dispatch(
          showGlobalMessage({
            text: `Slots ${editSlotMode ? "updated" : "added"} successfully`,
            type: "success",
          })
        );

        if (!editSlotMode) {
          resetForm();
        }
        history.push(`/home/dashboard/delivery/hubs`);
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
    resetFields({ fields: fieldsToReset, formik });
    setSlotFields([{ id: 0 }]);
  };

  const formik = useFormik({
    initialValues,
    validationSchema: slotsValidationSchema,
    onSubmit: handleSubmit,
  });

  const createSlotFields = (data) => {
    const totalFields = data.filter(
      (each) => each.state === PENDING_APPROVAL
    ).length;

    if (totalFields > 1) {
      const fieldsToAppend = Array(totalFields - 1)
        .fill()
        .map((each, index) => ({ id: index + 1 }));

      if (fieldsToAppend.length) {
        setSlotFields([...slotFields, ...fieldsToAppend]);
      }
    }
  };

  const setSlotFieldsInFormik = (data) => {
    let body = [];
    const totalSlotsValues = data.filter(
      (each) => each.state === PENDING_APPROVAL
    );

    totalSlotsValues.length &&
      totalSlotsValues.forEach((slot) => {
        let field = {
          id: slot.id,
          name: slot.name,
          slotEndTime: slot.slotEndTime,
          slotStartTime: slot.slotStartTime,
        };
        body.push(field);
      });
    return body;
  };

  const preFillForm = (data) => {
    if (data.result) {
      createSlotFields(data.result);
      const body = setSlotFieldsInFormik(data.result);
      const key = "addClientHubSlotModel";
      formik.setFieldValue(key, body);
    }
  };

  const getSlotListing = async () => {
    setLoading(true);
    try {
      if (clientHubId && editSlotMode) {
        const filters = {
          search_via: "client_hub_id",
          search_val: clientHubId,
          page_number: 1,
          page_size: 100,
        };
        const { status, data = {} } = await getSlots(filters);
        if (status) {
          preFillForm(data);
          setSlots(
            data.result.filter((each) => each.state === PENDING_APPROVAL)
          );
        } else {
          setSlotFields([]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSlotListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientHubId]);

  return (
    <>
      <Backdrop className={classes.backdrop} open={!!loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <form onSubmit={formik.handleSubmit} noValidate>
        <Slots
          formik={formik}
          getIn={getIn}
          slotFields={slotFields}
          setSlotFields={setSlotFields}
          editSlotMode={editSlotMode}
          slots={slots}
        />

        <If condition={!editSlotMode || slots.length}>
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
        </If>
        <LinkButton
          to="/home/dashboard/delivery/hubs"
          variant="contained"
          className={!editSlotMode || slots.length ? spacing.ml4 : ""}
        >
          Goto hubs listing
        </LinkButton>
      </form>
    </>
  );
};

export default AddSlotForm;
