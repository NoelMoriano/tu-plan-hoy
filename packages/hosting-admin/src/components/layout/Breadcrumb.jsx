import React from "react";
import { capitalize } from "lodash";
import { Breadcrumb } from "../ui";
import { roles } from "../../data-list";

export const BreadcrumbLayout = ({ user }) => {
  const legend = window.location.pathname.split("/").filter((legend) => legend);

  const findRole = (roleCode) =>
    roles.find((role) => role.roleCode === roleCode);

  return (
    <Breadcrumb
      style={{ margin: "16px" }}
      items={[
        {
          title: capitalize(findRole(user?.roleCode)?.roleName || "User"),
        },
        ...(legend || []).map((legend) => ({ title: capitalize(legend) })),
      ]}
    >
      <Breadcrumb.Item></Breadcrumb.Item>
    </Breadcrumb>
  );
};
