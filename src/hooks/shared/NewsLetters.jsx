import * as React from "react";
import { ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";
import dump from "../../assets/closet-image/dump.png";
import dumpBag from "../../assets/closet-image/dumpBag.png";
import { Card, CardContent } from "@/components/ui/card";

const CarouselItemContent = () => (
    <div className="relative   h-[580px] w-[1520px] mx-auto bg-[#F8DAB0] rounded-[20px] p-6 flex items-center gap-10 overflow-hidden mt-[-30px] border">
        <div className="max-w-[40%]">
            <h2 className="text-[40px] font-bold text-black">Subscribe our newsletter</h2>
            <p className="text-gray-700 mt-2 text-[16px]">
                From Chanel to Hermès, experience luxury at your fingertips with our verified and curated collections.
            </p>

            <div className="mt-4 flex items-center bg-white p-2 rounded-full shadow-md w-[508px]">
                <input
                    type="email"
                    placeholder="Email Address"
                    className="flex-1 outline-none px-4 bg-transparent text-gray-700 placeholder-gray-500"
                />
                <button className="bg-black text-white px-4 py-2 rounded-full font-medium">
                    Subscribe
                </button>
            </div>
        </div>

        <div className="relative w-[60%]">
            <div className="absolute right-0 top-[28rem] mb-3 w-[1685px] text-[150px] font-extrabold leading-[132%] tracking-[-1.5px] text-white opacity-40 uppercase z-0">
                T<span className="pl-[15px]">HE</span> IMPOSSIBLE BAGS
            </div>

            <div className="relative z-10">
                <img src={dump} alt="Luxury Bag" className="h-[580px] w-[500px] object-cover" />
            </div>

            <div className="absolute flex w-[244px] h-[160px] p-3 right-[2rem] bottom-[8rem] bg-white rounded-[24px] shadow-lg items-start gap-2 flex-shrink-0 z-20">
                <div className="w-full">
                    <div className="text-gray-600 text-sm pt-3">Price</div>
                    <div className="font-bold text-black text-lg pt-2">$150.00</div>
                    <button className="bg-black text-white p-2 rounded-full mt-4">
                        <ShoppingCart size={16} />
                    </button>
                </div>

                <div>
                    <img src={dumpBag} alt="Bag" className="w-[200px] h-[140px] hidden sm:block" />
                </div>
            </div>
        </div>
    </div>
);

export function NewsLetters() {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const totalItems = 5; // Total number of items in the carousel

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalItems);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalItems) % totalItems);
    };

    return (
        <div className="relative w-full max-w-[1520px] mx-auto">
            {/* ✅ Arrow Buttons Fixed at Top-Right Corner */}
            <div className="absolute top-10 right-20 flex gap-2 z-30">
                <div
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A5A5A5] shadow-md cursor-pointer"
                    onClick={handlePrev}
                >
                    <ArrowLeft size={24} />
                </div>
                <div
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#A5A5A5] shadow-md cursor-pointer"
                    onClick={handleNext}
                >
                    <ArrowRight size={24} />
                </div>
            </div>

            {/* ✅ Carousel Wrapper */}
            <div className="relative w-full overflow-hidden">
                <div
                    className="flex transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {Array.from({ length: totalItems }).map((_, index) => (
                        <div key={index} className="flex-shrink-0 w-full">
                            <div className="p-1">
                                <Card className="relative ">
                                    <CardContent className="flex items-center justify-center ">
                                        <CarouselItemContent />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
