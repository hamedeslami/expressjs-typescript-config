const RbacMessage: { [key: string]: string } = Object.freeze({
    FIELD_VALIDATION: "There was an error validating the sent information",
    CREATE_ROLE_SUCCESS: "New role created successfully.",
    UPDATE_ROLE_SUCCESS: "Role updated successfully.",
    DELETE_ROLE_SUCCESS: "Role delete successfully.",
    CREATE_PERMISSION_SUCCESS: "New permission created successfully.",
    UPDATE_PERMISSION_SUCCESS: "Permission updated successfully.",
    GET_ALL_ROLE_SSUCCESS: "Get all roles successfully.",
    GET_ALL_PERMISSION_SSUCCESS: "Get all permissions successfully.",
    DELETE_PERMISSION_SUCCESS: "Permission deleted successfully",
    INVALID_PERMISSION_IDS: "Invalid permissionIds. It must be an array of numbers.",
    ASSIGNED_PERMISSIONS_SUCCESS: "Permissions assigned successfully",
    INVALID_ROLE_IDS: "Invalid roleIds. It must be an array of numbers.",
    ASSIGNED_ROLES_SUCCESS: "Roles assigned successfully",
    ROLE_NOT_FOUND: "Role not found!",
    PERMISSION_NOT_FOUND: "Permission not found",
    SOME_PERMISSION_NOT_FOUND: "One or more permissions not found",
    SOME_ROLE_NOT_FOUND: "One or more roles not found"
});

export default RbacMessage;
