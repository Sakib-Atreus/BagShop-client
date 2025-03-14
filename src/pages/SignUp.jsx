import { Button, Input } from "@heroui/react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { motion } from "framer-motion";
import { EyeSlashFilledIcon } from "@/assets/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/assets/icons/EyeFilledIcon";
import { Player } from "@lottiefiles/react-lottie-player";
import { Icons } from "@/assets/icons/Icons";
import { AuthContext } from "@/hooks/AuthContextProvider";
import usePostMutate from "@/hooks/shared/usePostMutate";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

import { imageUpload } from "../helpers/cloudinary";
import ImageSelector from "../others/ImageSelector";
import AuthHeader from "../components/auth/AuthHeader";

const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const location = useLocation();
  const { path } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState();
  const {
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
    watch,
  } = useForm();

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const onSuccess = (res) => {
    console.log(res);
    Cookies.set("user", res?.data?.data?.accessToken, { expires: 30 });
    setUser(res?.data?.data?.user);
    toast.success("User Created Successfully");
    navigate("/login");
    setIsLoading(false);
  };

  const onError = (err) => {
    toast.error(err?.response?.data?.message || "Something went wrong");
    setIsLoading(false);
  };

  const { mutate } = usePostMutate("/user/createUser", onSuccess, onError);

  const onSubmit = async (userData) => {
    console.log(userData, "signupUserData");
    setIsLoading(true);
    // if (!userData.avatar) {
    //   setIsLoading(false);
    //   return setError("avatar", {
    //     type: "manual",
    //     message: "Image is required.",
    //   });
    // }
    mutate(userData);
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right, #F1FBFF, #F1EDEB, #F8DAB0)",
      }}
      className="w-full flex items-center justify-center"
    >
      <Card
        radius="none"
        shadow="none"
        className="bg-transparent w-[493px] mb-16"
      >
        <CardHeader className="p-0 w-full text-center flex flex-col  gap-3">
          <AuthHeader heading="Sign Up" />
        </CardHeader>

        <CardBody className="p-0">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-center flex flex-col gap-5 mt-8 "
          >
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    isInvalid={errors.name ? true : false}
                    classNames={{
                      errorMessage: "text-left",
                      inputWrapper: "bg-white",
                    }}
                    label="Name"
                    labelPlacement="outside"
                    radius="lg"
                    errorMessage={errors.name && errors.name.message}
                  />
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "Email is required" }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="email"
                    isInvalid={errors.email ? true : false}
                    classNames={{
                      errorMessage: "text-left",
                      inputWrapper: "bg-white",
                    }}
                    label="Email Address"
                    labelPlacement="outside"
                    radius="lg"
                    errorMessage={errors.email && errors.email.message}
                  />
                </div>
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{ required: "Phone Number is required" }}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type="text"
                    isInvalid={errors.phone ? true : false}
                    classNames={{
                      errorMessage: "text-left",
                      inputWrapper: "bg-white",
                    }}
                    label="Phone Number"
                    labelPlacement="outside"
                    radius="lg"
                    errorMessage={errors.phone && errors.phone.message}
                  />
                </div>
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    type={isVisible ? "text" : "password"}
                    isInvalid={errors.password ? true : false}
                    errorMessage={errors.password && errors.password.message}
                    classNames={{
                      errorMessage: "text-left",
                      inputWrapper: "bg-white",
                    }}
                    label="Password"
                    labelPlacement="outside"
                    placeholder="Your Password"
                    radius="lg"
                    endContent={
                      <button type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                  />
                </div>
              )}
            />
            <div>
              <ul className="text-[#5A5C5F] text-left text-xs list-disc pl-5">
                <li>6-20 Characters</li>
                <li>Contains number, letter, symbols</li>
              </ul>
            </div>
            <Button
              disabled={isLoading}
              isLoading={isLoading}
              color="primary"
              radius="lg"
              className="w-full font-bold"
              type="submit"
            >
              Sign Up
            </Button>
          </form>
          <div className="flex justify-center gap-2 mt-3">
            <p className="text-[#5A5C5F] text-base">Already have an account?</p>{" "}
            <Link to={"/login"} className="font-semibold text-[#141414]">
              Log In
            </Link>
          </div>
        </CardBody>
        <CardFooter className="p-0"></CardFooter>
        <div className="max-w-sm w-full  rounded-lg  shadow-md"></div>
      </Card>
    </div>
    // <motion.div
    //   variants={containerVariants}
    //   initial="hidden"
    //   animate="visible"
    //   exit="exit"
    //   className="  relative  min-h-screen"
    // >
    //   <Link to={"/"}>
    //     <Icons.logoICon className=" hidden md:flex absolute  text-danger  top-10 left-10" />
    //   </Link>

    //   <div className=" w-full mx-auto md:grid grid-cols-3  h-full   items-center justify-center">
    //     <div className="flex-1 hidden md:flex min-h-full col-span-2   justify-center items-center  h-full w-full dark:bg-darkish    bg-no-repeat  mx-auto  ">
    //       <Player
    //         autoplay
    //         loop
    //         src="https://lottie.host/a1a5f6ba-fffd-4887-a289-638b75651637/gFaYX8uQLu.json"
    //         style={{ height: "500px", width: "500px" }}
    //       ></Player>
    //     </div>
    //     <div className="flex-1 w-full  flex justify-center items-center mx-auto">
    //       <Card className="bg-transparent border-none  ">
    //         <CardHeader className="flex flex-col gap-4">
    //           <p className="text-2xl font-medium">
    //             Get started absolutely free
    //           </p>
    //           <p className="text-sm font-medium">
    //             Already have an account?{" "}
    //             <Link to={"/login"} className="text-danger hover:underline">
    //               Sign In
    //             </Link>
    //           </p>
    //         </CardHeader>
    //         <CardContent>
    //           <form
    //             onSubmit={handleSubmit(onSubmit)}
    //             className="text-center flex flex-col gap-5 mt-8 "
    //           >
    //             <div className="flex justify-center items-center gap-4">
    //               {avatarUrl ? (
    //                 <ImageSelector handleFileChange={handleFileChange}>
    //                   <Avatar
    //                     isBordered
    //                     size="md"
    //                     classNames={{
    //                       base: " h-[50px] ",
    //                     }}
    //                     radius="sm"
    //                     src={avatarUrl}
    //                   />
    //                 </ImageSelector>
    //               ) : (
    //                 <ImageSelector handleFileChange={handleFileChange}>
    //                   <Avatar
    //                     isBordered
    //                     size="md"
    //                     classNames={{
    //                       base: " h-[50px] ",
    //                     }}
    //                     radius="sm"
    //                     icon={<AvatarIcon />}
    //                   />
    //                 </ImageSelector>
    //               )}

    //               <div className="w-full">
    //                 <Controller
    //                   name="name"
    //                   control={control}
    //                   defaultValue=""
    //                   rules={{ required: " Name is required" }}
    //                   render={({ field }) => (
    //                     <div>
    //                       <Input
    //                         {...field}
    //                         type="text"
    //                         isInvalid={errors.name ? true : false}
    //                         classNames={{
    //                           errorMessage: "text-left",
    //                         }}
    //                         errorMessage={errors.name && errors.name.message}
    //                         label="Name"
    //                         variant={"bordered"}
    //                       />
    //                     </div>
    //                   )}
    //                 />
    //               </div>
    //             </div>

    //             <Controller
    //               name="email"
    //               control={control}
    //               defaultValue=""
    //               rules={{ required: " Email is required" }}
    //               render={({ field }) => (
    //                 <div>
    //                   <Input
    //                     {...field}
    //                     type="email"
    //                     isInvalid={errors.email ? true : false}
    //                     classNames={{
    //                       errorMessage: "text-left",
    //                     }}
    //                     errorMessage={errors.email && errors.email.message}
    //                     label="Email"
    //                     variant={"bordered"}
    //                   />
    //                 </div>
    //               )}
    //             />
    //             <Controller
    //               name="bloodGroup"
    //               control={control}
    //               defaultValue=""
    //               rules={{ required: "Role is required" }}
    //               render={({ field }) => (
    //                 <div>
    //                   <Select
    //                     {...field}
    //                     label="Blood Group"
    //                     placeholder="Select Blood Group"
    //                     isInvalid={errors.bloodGroup ? true : false}
    //                     errorMessage={
    //                       errors.bloodGroup && errors.bloodGroup.message
    //                     }
    //                     variant="bordered"
    //                   >
    //                     {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
    //                       (item) => (
    //                         <SelectItem key={item} value={item}>
    //                           {item}
    //                         </SelectItem>
    //                       )
    //                     )}
    //                   </Select>
    //                 </div>
    //               )}
    //             />

    //             <Controller
    //               name="password"
    //               control={control}
    //               defaultValue=""
    //               rules={{
    //                 required: "Password is required",
    //                 minLength: {
    //                   value: 6,
    //                   message: "Password is incorrect",
    //                 },
    //               }}
    //               render={({ field }) => (
    //                 <div>
    //                   <Input
    //                     {...field}
    //                     type={isVisible ? "text" : "password"}
    //                     variant={"bordered"}
    //                     isInvalid={errors.password ? true : false}
    //                     errorMessage={
    //                       errors.password && errors.password.message
    //                     }
    //                     classNames={{
    //                       errorMessage: "text-left",
    //                     }}
    //                     label="Password"
    //                     endContent={
    //                       <button
    //                         className="focus:outline-none"
    //                         type="button"
    //                         onClick={toggleVisibility}
    //                       >
    //                         {isVisible ? (
    //                           <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    //                         ) : (
    //                           <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    //                         )}
    //                       </button>
    //                     }
    //                   />
    //                 </div>
    //               )}
    //             />

    //             <Controller
    //               name="confirmPassword"
    //               control={control}
    //               defaultValue=""
    //               rules={{
    //                 required: "Confirm Password is required",
    //                 validate: (value) =>
    //                   value === watch("password") || "Passwords do not match",
    //               }}
    //               render={({ field }) => (
    //                 <div>
    //                   <Input
    //                     {...field}
    //                     type={isVisible ? "text" : "password"}
    //                     isInvalid={errors.confirmPassword ? true : false}
    //                     errorMessage={
    //                       errors.confirmPassword &&
    //                       errors.confirmPassword.message
    //                     }
    //                     endContent={
    //                       <button
    //                         className="focus:outline-none"
    //                         type="button"
    //                         onClick={toggleVisibility}
    //                       >
    //                         {isVisible ? (
    //                           <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    //                         ) : (
    //                           <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
    //                         )}
    //                       </button>
    //                     }
    //                     variant={"bordered"}
    //                     classNames={{
    //                       errorMessage: "text-left",
    //                     }}
    //                     label="Confirm Password"
    //                   />
    //                 </div>
    //               )}
    //             />
    //             {errors.avatar && (
    //               <p className="text-left text-danger text-sm mt-2">
    //                 {errors.avatar.message}
    //               </p>
    //             )}

    //             <Button
    //               disabled={isLoading}
    //               color="primary"
    //               className="w-full  rounded-lg  font-bold   "
    //               type="submit"
    //             >
    //               {isLoading ? (
    //                 <>
    //                   <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
    //                   Creating
    //                 </>
    //               ) : (
    //                 <>Create Account</>
    //               )}
    //             </Button>
    //           </form>
    //           <div className="text-muted-foreground text-tiny text-center mt-5">
    //             By signing up, I agree to{" "}
    //             <span className="text-primary underline cursor-pointer">
    //               Terms of Service
    //             </span>
    //             .
    //           </div>
    //         </CardContent>
    //         <CardFooter></CardFooter>
    //         <div className="max-w-sm w-full  rounded-lg  shadow-md"></div>
    //       </Card>
    //     </div>
    //   </div>
    // </motion.div>
  );
};

export default SignUp;

const containerVariants = {
  hidden: {
    opacity: 0,
    x: "-100vh",
  },
  exit: {
    x: "100vh",
    transition: {
      ease: "easeInOut",
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,

      type: "spring",
    },
  },
};
