import React from "react";
import { useForm } from "react-hook-form";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SellingForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <div>
            {/* Selling Form Section */}
            <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-r from-[#F1FBFF] to-orange-100 rounded-lg shadow-lg mt-8 mb-16">
                <h1 className="text-2xl font-bold text-center mb-4">What Are You Selling?</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 px-4">
                        {/* Design Item */}
                        <div className="flex flex-col w-full p-4">
                            <h2 className="mb-2 ml-2 font-geist font-medium text-lg">Design</h2>
                            <Select {...register("design", { required: true })}>
                                <SelectTrigger className="w-full sm:w-[493px] p-4 pt-8 pb-8 rounded-[24px] border-[1px]">
                                    Select A Design Name
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Graphic">Graphic</SelectItem>
                                    <SelectItem value="Autocad">Autocad</SelectItem>
                                    <SelectItem value="Photoshop">Photoshop</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Category Item */}
                        <div className="flex flex-col w-full p-4 sm:ml-0 lg:ml-24">
                            <h2 className="mb-2 ml-2 font-geist font-medium text-lg">Category</h2>
                            <Select {...register("category", { required: true })} className="w-full p-4">
                                <SelectTrigger className="w-full sm:w-[493px] p-4 pt-8 pb-8 rounded-[24px] border-[1px]">Select A Category</SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Web Design">Web Design</SelectItem>
                                    <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                                    <SelectItem value="3D Modeling">3D Modeling</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Item/Product Name */}
                        <div className="flex flex-col w-full sm:w-[1006px] p-4 sm:col-span-2 lg:col-span-3">
                            <h2 className="mb-2 ml-2 font-geist font-medium text-lg">Item/Product Name</h2>
                            <Input
                                className="w-full h-[64px] rounded-[24px] border-[1px] p-[20px]"
                                {...register("productName", { required: true })}
                                type="text"
                                placeholder="Enter Your Product Name"
                            />
                        </div>
                    </div>

                    {/* Item Details and Condition */}
                    <div className="mt-8">
                        <h3 className="font-medium text-lg mb-3">Item Details and Condition</h3>
                        <Textarea
                            name="details"
                            {...register("details", { required: true })}
                            placeholder="Enter item details and condition"
                            rows={4}
                            className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SellingForm;