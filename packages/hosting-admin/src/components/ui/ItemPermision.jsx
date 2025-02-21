import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmarkCircle } from "@fortawesome/free-regular-svg-icons";

export const ItemPermission = ({ condition = false, children }) => {
  return (
    <div
      style={{
        fontSize: "1em",
        marginBottom: "1em",
        display: "flex",
        gap: "1em",
      }}
    >
      <div>
        <FontAwesomeIcon
          icon={condition ? faCheck : faXmarkCircle}
          color={condition ? "green" : "red"}
          fontSize="1.5em"
        />
      </div>
      <div>{children}</div>
    </div>
  );
};
