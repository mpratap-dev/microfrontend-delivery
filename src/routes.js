import React from "react";
import ClientCreation from "./components/delivery/client/ClientInfo";
import ClientListing from "./components/delivery/client";
import PrivateRoute from "./components/common/private-route";
import { Route } from "react-router-dom";
import RateCardListing from "./components/delivery/rateCard";
import HubListing from "./components/delivery/hub";
import CreateHub from "./components/delivery/hub/CreateHub";
import RequirementsListing from "./components/delivery/requirements/listing";
import RequirementDetails from "./components/delivery/requirements/details";
import ClientDriverDetails from "./components/delivery/driverDetails";
import ClientDriverDetailsForm from "./components/delivery/driverDetails/DriverDetailsInfo";
import FilesUploaded from "./components/delivery/uploadedFiles";
import ClientTransaction from "./components/delivery/transaction";

const DeliveryRoutes = () => (
  <>
    <PrivateRoute
      exact
      path="/delivery/clients/create"
      key="/delivery/clients/create"
      Component={ClientCreation}
      errorPath={"/home/dashboard/error"}
      authentication={[{ permission: "delivery_client", operation: ["ADD"] }]}
    />
    <PrivateRoute
      exact
      path="/delivery/clients"
      key="/delivery/clients"
      Component={ClientListing}
      errorPath={"/home/dashboard/error"}
      authentication={[{ permission: "delivery_client", operation: ["VIEW"] }]}
    />
    <PrivateRoute
      exact
      path="/delivery/hubs/create/:id/slots"
      key="/delivery/hubs/create/:id/slots"
      Component={CreateHub}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_hub_slot", operation: ["ADD"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/hubs/edit/:id/slots"
      key="/delivery/hubs/edit/:id/slots"
      Component={CreateHub}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_hub_slot", operation: ["EDIT"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/hubs/edit/:id"
      key="/delivery/hubs/edit/:id"
      Component={CreateHub}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_hub", operation: ["ADD", "EDIT"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/hubs/create"
      key="/delivery/hubs/create"
      Component={CreateHub}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_hub", operation: ["ADD"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/hubs"
      key="/delivery/hubs"
      Component={HubListing}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_hub", operation: ["VIEW"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/rate-cards"
      key="/delivery/rate-cards"
      Component={RateCardListing}
      errorPath={"/error"}
      authentication={[
        {
          permission: "delivery_client_rate_card",
          operation: ["VIEW", "EDIT", "ACTIVATION"],
        },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/requirements"
      key="/delivery/requirements"
      Component={RequirementsListing}
      errorPath={"error"}
      authentication={[
        {
          permission: "delivery_requirement",
          operation: ["VIEW"],
        },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/requirements/:id"
      key="/delivery/requirements/:id"
      Component={RequirementDetails}
      errorPath={"error"}
      authentication={[
        {
          permission: "delivery_requirement",
          operation: ["VIEW"],
        },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/driver-details/create"
      key="/delivery/driver-details/create"
      Component={ClientDriverDetailsForm}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_driver_mapping", operation: ["ADD"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/driver-details"
      key="/delivery/driver-details"
      Component={ClientDriverDetails}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_driver_mapping", operation: ["VIEW"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/driver-details/edit/:id"
      key="/delivery/driver-details/edit/:id"
      Component={ClientDriverDetailsForm}
      errorPath={"/error"}
      authentication={[
        { permission: "delivery_client_driver_mapping", operation: ["EDIT"] },
      ]}
    />
    <PrivateRoute
      exact
      path="/delivery/client-transactions"
      key="/delivery/client-transactions"
      Component={ClientTransaction}
      errorPath={"/home/dashboard/error"}
      authentication={[
        { permission: "delivery_fulfilment", operation: ["VIEW"] },
      ]}
    />
    <Route path="/delivery/uploaded-files">
      <FilesUploaded />
    </Route>
  </>
);

export default DeliveryRoutes;
