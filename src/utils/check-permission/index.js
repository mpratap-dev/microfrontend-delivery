export const checkAuthentication = (
  authentication,
  userPermissions,
  isSuperUser
) =>
  isSuperUser ||
  Object.keys(authentication).find((id) =>
    Object.keys(userPermissions).find(
      (key) =>
        userPermissions[key].permission === authentication[id].permission &&
        authentication[id].operation.every((item) =>
          userPermissions[key].op.includes(item)
        )
    )
  );

export const checkPermissions = (permission, op) => {
  const roleId = localStorage.getItem("roleId");
  const isSuperUser = String(roleId) === "1";

  if (isSuperUser) return isSuperUser;
  let havePermission = false;
  try {
    const permissions = localStorage.getItem("permissions");
    const userPermissions = JSON.parse(permissions);
    const requirementPermissions = userPermissions.find(
      (each) => each.permission === permission
    );
    havePermission =
      requirementPermissions &&
      Array.isArray(requirementPermissions.op) &&
      requirementPermissions.op.includes(op);
  } catch (error) {
    console.error(
      "Error while parsing permissions string from local storage: ",
      error
    );
    havePermission = false;
  }

  return havePermission;
};
