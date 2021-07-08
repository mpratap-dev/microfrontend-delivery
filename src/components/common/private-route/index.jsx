import React from "react";
import { checkAuthentication } from "../../../utils/check-permission";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PrivateRoute({
  Component,
  errorPath,
  authentication,
  routeProps,
  ...rest
}) {
  const isSuperUser = localStorage.getItem("roleId");
  const permissions = localStorage.getItem("permissions");
  const userPermissions = permissions ? JSON.parse(permissions) : {};

  return (
    <Route
      {...rest}
      render={(props) => {
        return checkAuthentication(
          authentication,
          userPermissions,
          isSuperUser
        ) ? (
          <Component {...props} {...routeProps} {...rest} />
        ) : (
          "You dont have access to this page"
        );
      }}
    />
  );
}
