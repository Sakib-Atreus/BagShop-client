import { Chip, Tooltip, User } from "@heroui/react";
import React from "react";

export const TickIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M5 10L8 13L15 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

export const DeclineIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 20 20"
      width="1em"
      {...props}
    >
      <path
        d="M4 4L16 16M4 16L16 4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      />
    </svg>
  );
};

const renderCell = React.useCallback((user, columnKey) => {
  const cellValue = user[columnKey];

  switch (columnKey) {
    case "name":
      return (
        <User
          avatarProps={{ radius: "lg", src: user?.bannerImg }}
          name={user?.shopName}
        >
          {user.email}
        </User>
      );
    case "status":
      return (
        <Chip
          className="capitalize"
          color={statusColorMap[user?.approvalStatus]}
          size="sm"
          variant="flat"
        >
          {user?.approvalStatus}
        </Chip>
      );
    case "actions":
      return (
        <div className="relative flex items-center gap-2">
          <Tooltip color="danger" content="Decline shop">
            <span
              className="text-lg text-danger cursor-pointer active:opacity-50"
              onClick={() => updateStatus(user?._id, "decline")}
            >
              <DeclineIcon />
            </span>
          </Tooltip>
          <Tooltip color="success" content="Approve shop">
            <span
              className="text-lg text-successS cursor-pointer active:opacity-50"
              onClick={() => updateStatus(user?._id, "approve")}
            >
              <TickIcon />
            </span>
          </Tooltip>
        </div>
      );
    default:
      return cellValue;
  }
}, []);
