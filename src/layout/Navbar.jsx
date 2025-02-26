import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/react";

import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/AuthContextProvider";
import { motion } from "framer-motion";
import UserPopover from "@/components/UserPopover";
import logo from "../assets/header/logo/logo.png";
import avatar from "../assets/header/end/avatar.png";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../redux/features/wishlistSlice";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //redux
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state?.wishlist?.items);

  console.log(wishlist, "wishlist in navbar line 28");
  const { user, logout } = useContext(AuthContext);

  //dispatch
  useEffect(() => {
    dispatch(fetchWishlist(user?.userId));
  }, [dispatch, user?.userId]);

  console.log(user, "user in navbar");

  return (
    <Navbar
      isBordered={false}
      isBlurred={false}
      maxWidth="2xl"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className=" py-2 z-50 text-white backdrop-blur-sm fixed top-0 w-[1520px] mx-auto bg-transparent flex justify-between items-center"
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:text-danger",
          "data-[active=false]:hover:text-danger",
        ],
      }}
    >
      <NavbarContent className=" text-black font-bold">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent as="div" justify="center">
        <div className="hidden md:flex gap-8">
          <motion.div
            initial="hidden"
            className="flex gap-6"
            animate="visible"
            variants={menuVariant}
          >
            <motion.div variants={childVariant} className="w-[200px]">
              <Link to="/">
                <img src={logo} alt="" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <NavbarMenu className="bg-gradient-to-r from-[#F1FBFF] via-[#F1EDEB] to-[#F8DAB0] h-[1123px] lg:w-[1560px] mx-auto pt-10 ">
          <NavLink to="/">
            {({ isActive }) => (
              <NavbarItem
                className="hover:text-danger h-fit mb-4 font-bold"
                isActive={isActive}
              >
                Home
              </NavbarItem>
            )}
          </NavLink>

          <NavLink to="/closet" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-danger h-fit mb-4 font-bold"
                isActive={isActive}
              >
                Wishlist
              </NavbarItem>
            )}
          </NavLink>

          <NavLink to="/about" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-danger h-fit mb-4 font-bold"
                isActive={isActive}
              >
                About Us
              </NavbarItem>
            )}
          </NavLink>

          <NavLink to="/new-arrival" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-danger h-fit mb-4 font-bold"
                isActive={isActive}
              >
                New Arrival
              </NavbarItem>
            )}
          </NavLink>

          <NavLink to="/shop" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-danger h-fit mb-4 font-bold"
                isActive={isActive}
              >
                Shop
              </NavbarItem>
            )}
          </NavLink>

          <NavLink to="/contact" aria-current="page">
            {({ isActive }) => (
              <NavbarItem
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-danger h-fit mb-4 font-bold"
                isActive={isActive}
              >
                Contact
              </NavbarItem>
            )}
          </NavLink>
        </NavbarMenu>
      </NavbarContent>

      <NavbarContent justify="end">
        {user ? (
          <div className="flex items-center gap-4">
            <Link
              to="/closet"
              className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center relative"
            >
              <CiHeart className="w-[24px] h-[24px] text-black" />
              {wishlist.length ? (
                <div className="w-6 h-6 p-1 font-semibold bg-red-600 text-white rounded-full absolute -top-2 -right-3 flex items-center justify-center">
                  {wishlist.length}
                </div>
              ) : null}
            </Link>
            <Link
              to="/shopping-cart"
              className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center"
            >
              <IoCartOutline className="w-[24px] h-[24px]  text-black" />
            </Link>

            <UserPopover user={user} logout={logout} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/closet"
              className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center relative"
            >
              <CiHeart className="w-[24px] h-[24px] text-black" />
              {wishlist.length ? (
                <div className="w-6 h-6 p-1 font-semibold bg-red-600 text-white rounded-full absolute -top-2 -right-3 flex items-center justify-center">
                  {wishlist.length}
                </div>
              ) : null}
            </Link>
            <Link
              to="/shopping-cart"
              className="w-[50px] h-[50px] rounded-full bg-white flex items-center justify-center"
            >
              <IoCartOutline className="w-[24px] h-[24px]  text-black" />
            </Link>
            <div className="flex items-center gap-2 ">
              <Link to="/login">
                <Button
                  className="bg-black hover:bg-white hover:text-black"
                  variant="outline"
                >
                  Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </NavbarContent>
    </Navbar>
  );
}

const menuVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
const childVariant = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};
