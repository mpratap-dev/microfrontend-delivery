import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import AsyncTable from "../../common/table/AsyncTable";
import contactColumns from "./contactColumns";
import useSpacing from "../../../hooks/useSpacing";
import SlotTable from "./slotTable/SlotTable";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import If from "../../common/if";
import LinkButton from "../../common/link-button";
import EditIcon from "@material-ui/icons/Edit";
import { checkPermissions } from "../../../utils/check-permission";

const useStyles = makeStyles((theme) => ({
  modalHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slotInfoHead: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 0,
  },
  dialog: {
    "& .MuiDialog-paper": {
      width: "75%",
    },
  },
}));

const HubDetailsDialog = ({ dialogData, setDialogOpen, isDialogOpen }) => {
  const spacing = useSpacing();
  const classes = useStyles();
  const handleDialogClose = () => setDialogOpen(false);
  const [isEditEligible, setIsEditEligible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { contactInfo, name, id } = dialogData;

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Dialog
      onClose={handleDialogClose}
      maxWidth="lg"
      open={isDialogOpen}
      className={classes.dialog}
    >
      <DialogTitle
        disableTypography
        id="customized-dialog-title"
        className={classes.modalHead}
      >
        <Typography variant="subtitle2" className={spacing.ma0}>
          <strong>Hub ID:</strong>{" "}
          <Typography component="span" color="primary">
            {id}
          </Typography>
        </Typography>
        <Typography variant="subtitle2" className={spacing.ma0}>
          <strong>Hub Name:</strong>{" "}
          <Typography component="span" color="primary">
            {name}
          </Typography>
        </Typography>
        <IconButton aria-label="close" size="small" onClick={handleDialogClose}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className={spacing.pt0}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
          className={classes.tab}
        >
          <Tab label="contact details" />
          {/* <If condition={checkPermissions('delivery_client_hub_slot','VIEW')}> */}
          {checkPermissions("delivery_client_hub_slot", "VIEW") && (
            <Tab label="Slot details" />
          )}
          {/* </If> */}
        </Tabs>

        <If condition={activeTab === 0}>
          <AsyncTable
            data={contactInfo}
            dense
            scroll
            rowKey="number"
            columns={contactColumns}
          />
        </If>
        <If
          condition={
            activeTab === 1 &&
            checkPermissions("delivery_client_hub_slot", "VIEW")
          }
        >
          <If
            condition={
              isEditEligible &&
              checkPermissions("delivery_client_hub_slot", "EDIT")
            }
          >
            <LinkButton
              to={`/delivery/hubs/edit/${id}/slots`}
              color="primary"
              size="small"
              variant="outlined"
              startIcon={<EditIcon fontSize="small" />}
              className={spacing.my4}
            >
              Edit slots
            </LinkButton>
          </If>
          <SlotTable hubId={id} setIsEdit={setIsEditEligible} />
        </If>
      </DialogContent>
    </Dialog>
  );
};

export default HubDetailsDialog;
