import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
// import { formatDate } from "../../../utils/date-handler";
import { activateRateCard } from "../../../api/delivery";
import useSpacing from "../../../hooks/useSpacing";

const UseColumns = ({ rateCardStatus, setStatus, setOpen }) => {
  const spacing = useSpacing();
  const handleStatusChange = async (event, id) => {
    setStatus({ ...rateCardStatus, [id]: event.target.checked });
    const { status } = await activateRateCard(id);

    status && setOpen(true);
  };

  return [
    {
      title: "Rate Card ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Unit",
      dataIndex: "unitAndRate",
      key: "unit",
      render: (value) =>
        Object.keys(value).map((key, index) => (
          <p key={index} className={`${spacing.mt0} ${spacing.mb0}`}>
            {key}
          </p>
        )),
    },
    {
      title: "Price/unit",
      dataIndex: "unitAndRate",
      align: "right",
      key: "unitAndRate",
      render: (value) =>
        Object.keys(value).map((key, index) => (
          <p key={index} className={`${spacing.mt0} ${spacing.mb0}`}>
            {value[key]}
          </p>
        )),
    },
    {
      title: "Minimum guarantee amount",
      dataIndex: "minimumGuaranteedAmount",
      align: "right",
      key: "minimumGuaranteedAmount",
      render: (value) => value || "-",
    },
    // {
    //   title: "Start date",
    //   dataIndex: "startDate",
    //   key: "startDate",
    //   render: (date) => formatDate(date),
    // },
    // {
    //   title: "End date",
    //   dataIndex: "endDate",
    //   key: "endDate",
    //   render: (date) => formatDate(date)
    // },
    {
      title: "Applied on",
      dataIndex: "appliedOnName",
      key: "appliedOnName",
      render: (value) => value || "-",
    },
    {
      title: "Status",
      dataIndex: "state",
      key: "state",
      render: (state, { id }) => (
        <FormControlLabel
          control={
            <Switch
              checked={!!rateCardStatus[id]}
              onChange={(event) => {
                handleStatusChange(event, id);
              }}
              name="checkedB"
              color="secondary"
              disabled={!!rateCardStatus[id]}
            />
          }
          label={rateCardStatus[id] ? "Active" : "Inactive"}
        />
      ),
    },
  ];
};

export default UseColumns;
