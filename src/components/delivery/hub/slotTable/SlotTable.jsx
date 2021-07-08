import { Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getSlots, changeSlotStatus } from "../../../../api/delivery";
import useSpacing from "../../../../hooks/useSpacing";
import If from "../../../common/if";
import AsyncTable from "../../../common/table/AsyncTable";
import UseColumns from "./slotColumns";
import Message from "../../../common/message";
import { SLOT_STATE } from "../../../../constant/delivery";

const { ACTIVE, PENDING_APPROVAL } = SLOT_STATE;

const SlotTable = ({ hubId, title, showIfDataPresent, setIsEdit }) => {
  const spacing = useSpacing();
  const [slots, setSlots] = useState([]);
  const [slotStates, setSlotStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [message, setMessage] = useState({
    type: "success",
    text: "",
    visibility: false,
  });
  const [filterData, setFilterData] = useState({
    search_via: "client_hub_id",
    search_val: hubId,
    page_number: 1,
    page_size: 10,
  });

  const handleMessageClose = (event, reason) => {
    if (reason === "clickaway") return;
    setMessage({
      ...message,
      visibility: false,
    });
  };

  const changeSlotState = async (id, state) => {
    const data = { state };
    const response = await changeSlotStatus(id, data);
    try {
      const { status, message } = response;
      if (status) {
        const action = state === ACTIVE ? "approved" : "phased out";
        setMessage({
          type: "success",
          text: `Slot ${action} successfully`,
          visibility: true,
        });
        setSlotStates({ ...slotStates, [id]: state });
      } else {
        setMessage({
          type: "error",
          text: message || "Something went wrong",
          visibility: true,
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong",
        visibility: true,
      });
    }

    return response;
  };

  const checkPendingSlots = (clientHubSlot) => {
    let countPendingSlots = 0;
    clientHubSlot.forEach((hub) => {
      if (hub.state === PENDING_APPROVAL) {
        countPendingSlots++;
        typeof setIsEdit === "function" && setIsEdit(true);
      } else if (!countPendingSlots) {
        typeof setIsEdit === "function" && setIsEdit(false);
      }
    });
  };

  const getSlotListing = async () => {
    setLoading(true);
    try {
      if (hubId) {
        const {
          status,
          data: {
            result: clientHubSlot,
            totalAvailableResult: totalAvailableRecord,
          },
        } = await getSlots(filterData);
        if (status) {
          const totalPages = Math.ceil(
            totalAvailableRecord / filterData.page_size
          );

          setTotalPages(totalPages);
          checkPendingSlots(clientHubSlot);
          setSlots(clientHubSlot);
        } else {
          setSlots([]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns = UseColumns({ slotStates, changeSlotState });

  const handleFilters = ({ page, pageSize }) => {
    setFilterData({ ...filterData, page_number: page, page_size: pageSize });
  };

  const paginationProps = {
    total: totalPages,
    page: filterData.page_number,
    pageSize: filterData.page_size,
    handleChange: handleFilters,
    showSizeChanger: true,
  };

  useEffect(() => {
    getSlotListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]);

  useEffect(() => {
    const mappedStatus = {};
    Array.isArray(slots) &&
      slots.forEach(({ id, state }) => {
        mappedStatus[id] = state;
      });
    setSlotStates(mappedStatus);
  }, [slots]);

  return (
    <If condition={!showIfDataPresent || slots.length}>
      <Paper className={spacing.mb4}>
        <If condition={!!title}>
          <Typography
            variant="subtitle2"
            className={`${spacing.my4} ${spacing.pl4} ${spacing.pt4}`}
            color="primary"
          >
            {title}
          </Typography>
        </If>
        <AsyncTable
          data={slots}
          dense
          rowKey="id"
          loading={loading}
          pagination={paginationProps}
          elevation={0}
          columns={columns}
        />
      </Paper>
      <Message
        open={message.visibility}
        text={message.text}
        type={message.type}
        handleClose={handleMessageClose}
      />
    </If>
  );
};

export default SlotTable;
