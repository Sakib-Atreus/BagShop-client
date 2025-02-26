import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card } from "@/components/ui/card";
import axios from "axios";
import ReuseSubHeader from "../../section/Shared/ReuseSubHeader";
import SellingForm from "./SellingForm";
import { FaCamera } from "react-icons/fa";

const SellingMade = () => {
    const { handleSubmit, reset } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeCard, setActiveCard] = useState(1); // Set the starting active card to 0

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

    const photoLabels = [
        "Upload Image",
        "Front",
        "Back",
        "Inside",
        "Base",
        "Condition",
        "Details",
        "Retail Tag Or Sticker",
        "Seller Id Or Designer Id",
    ];

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
    });

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

    return (
        <div className="min-h-screen bg-white">
            <ReuseSubHeader title="Selling Made Simple" subtitle="We Provide upfront quote (by our offer)" />
            <SellingForm onSubmit={onSubmit} />

            <div className="w-full max-w-7xl mx-auto p-6 bg-gradient-to-r from-[#F1FBFF] to-orange-100 rounded-lg shadow-lg mt-8 mb-16">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className="mt-5">Upload Photos Of Your Item</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                        {photoLabels.map((label, index) => (
                            <Card
                                key={label}
                                onClick={(e) => {
                                    if (index === activeCard) {
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

export default SellingMade;