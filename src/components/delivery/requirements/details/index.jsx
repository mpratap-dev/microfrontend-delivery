import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RequirementDetail from "./RequirementDetail";
import CommitmentSection from "./commitments";
import { getSingleRequirement } from "../../../../api/delivery";
import { useDispatch } from "react-redux";
import { showGlobalMessage } from "../../../../store/actions";

const RequirementDetails = () => {
  const { id } = useParams();
  const [requirement, setRequirement] = useState({});
  const [committedVehicles, setCommittedVehicles] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getRequirement = async () => {
    setLoading(true);
    try {
      const { status, data, message } = await getSingleRequirement(id);
      if (status) {
        setRequirement(data);
        setCommittedVehicles(data.committedVehicleCount)
      } else {
        dispatch(
          showGlobalMessage({
            text: message || "Something went wrong",
            type: "error",
          })
        );
      }
    } catch (error) {
      dispatch(
        showGlobalMessage({
          text: "Something went wrong",
          type: "error",
        })
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRequirement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <RequirementDetail 
        requirementId={id} 
        loading={loading} 
        requirement={requirement} 
        committedVehicles={committedVehicles}
      />
      <CommitmentSection
        requirement={requirement}
        committedVehicles={committedVehicles}
        setCommittedVehicles={setCommittedVehicles}
      />
    </>
  );
};

export default RequirementDetails;
