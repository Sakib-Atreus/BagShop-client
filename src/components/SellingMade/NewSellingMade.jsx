import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaCamera } from "react-icons/fa";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import ReuseSubHeader from "../../section/Shared/ReuseSubHeader";

const NewSellingMade = () => {
    const { handleSubmit, reset, register, formState: { errors } } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeCard, setActiveCard] = useState(0); // Set the starting active card to 0

    const [formData, setFormData] = useState({
        images: {
            img: null,
            front: null,
            back: null,
            inside: null,
            base: null,
            condition: null,
            details: null,
            retailTag: null,
            sellerId: null,
        },
        design: '',
        category: '',
        productName: '',
        details: ''
    });

    const photoLabels = [
        "Upload Image", "Front", "Back", "Inside", "Base", "Condition", "Details", "Retail Tag Or Sticker", "Seller Id Or Designer Id"
    ];

    const fileInputRefs = photoLabels.reduce((acc, label) => {
        acc[label.toLowerCase()] = React.createRef();
        return acc;
    }, {});

    const handleFileChange = (e, type) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                images: { ...prev.images, [type]: file },
            }));
            setActiveCard((prev) => prev + 1); // Move to the next card after uploading the image
        }
    };

    const triggerFileInput = (label, e) => {
        // Stop event propagation to avoid triggering photo upload from Select
        e.stopPropagation();

        // Only trigger if the card is active and file input is not already clicked
        if (activeCard === photoLabels.indexOf(label)) {
            fileInputRefs[label.toLowerCase()].current.click();
        }
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await axios.post("https://jsonplaceholder.typicode.com/posts", data);
            alert("Profile updated successfully!");
            reset();
        } catch (error) {
            alert("Failed to update profile");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <ReuseSubHeader title="Selling Made Simple" subtitle="We Provide upfront quote (by our offer)" />

            {/* Selling Form Section */}
            <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-r from-[#F1FBFF] to-orange-100 rounded-lg shadow-lg mt-8 mb-16">
                <h1 className="text-2xl font-bold text-center mb-4">What Are You Selling?</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16 px-4">
                        {/* Design Item */}
                        <div className="flex flex-col w-full p-4">
                            <h2 className="mb-2 ml-2 font-medium text-lg">Design</h2>
                            <select
                                {...register("design", { required: true })}
                                className="w-full sm:w-[493px] p-4 pt-8 pb-8 rounded-[24px] border-[1px]"
                                onClick={(e) => e.stopPropagation()} // Prevent click propagation
                            >
                                <option value="" disabled selected>Select A Design Name</option>
                                <option value="Graphic">Graphic</option>
                                <option value="Autocad">Autocad</option>
                                <option value="Photoshop">Photoshop</option>
                            </select>
                        </div>

                        {/* Category Item */}
                        <div className="flex flex-col w-full p-4 sm:ml-0 lg:ml-24">
                            <h2 className="mb-2 ml-2 font-medium text-lg">Category</h2>
                            <select
                                {...register("category", { required: true })}
                                className="w-full sm:w-[493px] p-4 pt-8 pb-8 rounded-[24px] border-[1px]"
                                onClick={(e) => e.stopPropagation()} // Prevent click propagation
                            >
                                <option value="" disabled selected>Select A Category</option>
                                <option value="Web Design">Web Design</option>
                                <option value="UI/UX Design">UI/UX Design</option>
                                <option value="3D Modeling">3D Modeling</option>
                            </select>
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

                    {/* Photo Upload Section */}
                    <div className="mt-8">
                        <h1 className="mt-5">Upload Photos Of Your Item</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                            {photoLabels.map((label, index) => (
                                <Card
                                    key={label}
                                    onClick={(e) => {
                                        // Stop event propagation to avoid triggering file input from Select
                                        if (index === activeCard) {
                                            e.stopPropagation(); // Avoid file input triggering
                                            triggerFileInput(label, e);
                                        }
                                    }}
                                    className={`p-4 text-center cursor-pointer h-[186px] w-full sm:w-[186px] ${index <= activeCard ? 'border-green-500' : ''}`}
                                >
                                    {formData.images[label.toLowerCase()] ? (
                                        <div className="flex flex-col justify-center items-center h-full">
                                            <img
                                                src={URL.createObjectURL(formData.images[label.toLowerCase()])}
                                                alt={label}
                                                className="h-full object-cover w-full"
                                            />
                                            <span className="text-sm font-medium text-gray-700">{label}</span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col justify-center items-center h-full">
                                            {/* Show camera icon only for the first non-uploaded card */}
                                            {index === 0 && <FaCamera className="text-gray-700 text-4xl" />}
                                            <span className="text-sm text-gray-600 mt-2">{label}</span>
                                            {index === activeCard && (
                                                <input
                                                    ref={fileInputRefs[label.toLowerCase()]}
                                                    type="file"
                                                    onChange={(e) => handleFileChange(e, label.toLowerCase())}
                                                    className="mt-2 opacity-0 cursor-pointer w-full h-full absolute inset-0"
                                                />
                                            )}
                                        </div>
                                    )}
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center mt-8">
                        <button
                            type="submit"
                            className="w-[1006px] max-w-full bg-black h-[54px] px-[48px] py-[14px] text-[16px] text-white font-semibold rounded-[36px]"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit My Quote"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default NewSellingMade;
