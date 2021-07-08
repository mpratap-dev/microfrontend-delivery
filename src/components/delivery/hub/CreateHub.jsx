import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Step, StepLabel, Stepper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams, useHistory } from "react-router-dom";
import If from "../../common/if";
import useSpacing from "../../../hooks/useSpacing";
import Message from "../../common/message";
import AddSlotForm from "./AddSlotForm";
import AddHubForm from "./AddHubForm";

const useStyles = makeStyles({
  step: {
    cursor: "pointer",
  },
});

const HubInfo = () => {
  const spacing = useSpacing();
  const classes = useStyles();
  const [isMesageVisible, setMessageVisibility] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [editSlotMode, setIsEditSlotMode] = useState(false);
  const history = useHistory();
  const {
    location: { pathname },
  } = history;
  const { id: clientHubId } = useParams();
  const slotRoutes = [
    `/delivery/hubs/edit/${clientHubId}/slots`,
    `/delivery/hubs/create/${clientHubId}/slots`,
  ];
  const isSlotsRoute = slotRoutes.includes(pathname);

  const [message, setMessage] = useState({ type: "", text: "" });

  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") return;
    setMessageVisibility(false);
  };

  const showMessage = ({ type, text }) => {
    setMessage({ type, text });
    setMessageVisibility(true);
  };

  const handleStepClick = (step) => {
    if (!clientHubId) return;
    let route = "";

    if (step)
      route = `/delivery/hubs/create/${clientHubId}/slots`;
    else route = `/delivery/hubs/edit/${clientHubId}`;
    history.push(route);
  };

  useEffect(() => {
    setIsEditSlotMode(pathname === slotRoutes[0]);
    setActiveStep(+isSlotsRoute);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, clientHubId]);

  return (
    <>
      <Typography
        variant="subtitle1"
        component="h5"
        className={spacing.mb2}
        color="primary"
      >
        {clientHubId ? "EDIT" : "ADD"} HUB
      </Typography>

      <Grid container>
        <Grid item xs={12} sm={7}>
          <Stepper activeStep={activeStep}>
            <Step onClick={() => handleStepClick(0)} className={classes.step}>
              <StepLabel>{clientHubId ? "Edit" : "Add"} hub</StepLabel>
            </Step>
            <Step
              onClick={() => handleStepClick(1)}
              disabled={!clientHubId}
              className={classes.step}
            >
              <StepLabel>{editSlotMode ? "Edit" : "Add"} slots</StepLabel>
            </Step>
          </Stepper>

          <If
            condition={!activeStep}
            defaultCase={
              <AddSlotForm
                showMessage={showMessage}
                clientHubId={clientHubId}
                editSlotMode={editSlotMode}
              />
            }
          >
            <AddHubForm
              showMessage={showMessage}
              isSlotsRoute={isSlotsRoute}
              clientHubId={clientHubId}
            />
          </If>
        </Grid>
      </Grid>

      <Message
        open={isMesageVisible}
        text={message.text}
        type={message.type}
        handleClose={handleMessageClose}
      />
    </>
  );
};

export default HubInfo;
