/* eslint-disable react/prop-types */

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ui/ModeToggle";
import { Button } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetWishlist } from "../redux/features/wishlistSlice";

const UserPopover = ({ user, logout }) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleLogout = () => {
    console.log(resetWishlist);
    dispatch(resetWishlist());
    logout()
      .then(() => {
        console.log("User logged out");
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.avatar} />
          <AvatarFallback className="bg-black">CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="end"
        sideOffset={6}
        alignOffset={0}
        className=" z-[1000] bg-black backdrop-blur-2xl text-white rounded-lg backdrop-contrast-125 backdrop-saturate-200 border-[#262626]"
      >
        <div className="flex flex-col items-center">
          <p className="text-lg ">{user?.email}</p>
          <Separator className="my-4" />
          <ModeToggle />
          <Button
            fullWidth
            variant="light"
            className=" bg-[#27272A] rounded-xl py-1 px-4 text-white"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default UserPopover;
