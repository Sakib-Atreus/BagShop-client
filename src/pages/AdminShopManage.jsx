import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import useFetchQuery from "../hooks/shared/useFetch";
import CommonWrapper from "../components/CommonWrapper";
import useAxiosSecure from "../hooks/useAxios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

export const statusList = [
  { key: "", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  // { key: "decline", label: "Decline" },
  { key: "denied", label: "Denied" },
];

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

const statusColorMap = {
  approved: "success",
  decline: "danger",
  pending: "warning",
};

export default function AdminShopManage() {
  const Axios = useAxiosSecure();
  const [status, setStatus] = useState("");
  const token = Cookies.get("user");
  const { data, isLoading, isSuccess, refetch } = useFetchQuery(
    `/admin/${status ? "getAllShopRequests" : "getAllShops"}`,
    { approvalStatus: status }
  );

  const updateStatus = async (id, status) => {
    let toastId;
    try {
      toastId = toast.loading("Updating", { position: "top-right" });
      const response = await Axios.patch(
        `/admin/approveOrDenyShopReq?shopId=${id}&approvalStatus=${status}`
      );
      refetch();
    } catch (error) {
      toast.error("Something went wrong", { position: "top-right" });
      console.log(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  console.log(data?.data);

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

  return (
    <CommonWrapper>
      <div className="flex justify-end my-2">
        <Select
          className="max-w-xs"
          label="Status"
          onChange={(e) => setStatus(e.target.value)}
        >
          {statusList.map((status) => (
            <SelectItem key={status.key}>{status.label}</SelectItem>
          ))}
        </Select>
      </div>
      <Table aria-label="Example table with custom cells">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              // align={column.uid === "actions" ? "center" : "start"}
              align={"start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={data?.data || []}
          isLoading={isLoading}
          loadingState="skeleton"
          loadingContent={<Spinner />}
          emptyContent={<div>No shop available</div>}
        >
          {(item) => {
            return (
              <TableRow key={item._id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </CommonWrapper>
  );
}
