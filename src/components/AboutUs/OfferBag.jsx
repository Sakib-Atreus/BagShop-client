/* Static Code  */

import bag from '../../assets/image/bag.png';
import { GoArrowUpRight } from "react-icons/go";

const OfferBag = () => {
    return (
        <div className="relative max-w-full w-[1520px] mx-auto rounded-[20px] p-10 flex flex-wrap items-center gap-10 overflow-hidden">
            {/* Featured Section */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center p-4 md:p-8 rounded-xl w-full">
                {/* Image */}
                <div className="h-auto min-h-[300px] sm:min-h-[500px] md:h-[719px] w-full bg-[#EBEBEB] rounded-tl-[36px] rounded-bl-[36px] flex justify-center items-center">
                    <img
                        src={bag}
                        alt="Luxury Bag"
                        className="w-[200px] sm:w-[300px] md:w-[406px] h-auto object-cover rounded-xl max-w-full"
                    />
                </div>


                {/* Content */}
                <div className="w-full h-[719px] bg-orange-200 p-6 rounded-tr-[36px] rounded-br-[36px] flex justify-center items-center">
                    <div className="w-full max-w-[514px] h-full max-h-[463px] bg-white p-6 rounded-xl text-center shadow-md flex flex-col justify-center items-center">
                        {/* Title and Description */}
                        <div className="w-full max-w-[333px] flex flex-col justify-center items-center mt-4 md:mt-8">
                            <h2 className="text-xl font-semibold">Exclusive bag offers awaits</h2>
                            <p className="text-gray-500 mt-2 text-center">
                                Lorem ipsum dolor sit amet consectetur. Phasellus ornare vitae in urna suspendisse elit arcu tellus.
                            </p>
                        </div>

                        {/* Button */}
                        <div className="text-center mt-8 flex justify-start ">
                            <button className="bg-black px-[32px] py-[10px] text-[14px] text-white font-semibold rounded-[36px] md:px-[48px] md:py-[14px] md:text-[16px]">
                                See Collection
                            </button>
                            <button className="bg-black p-[14px] text-white rounded-full md:p-[20px]">
                                <GoArrowUpRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferBag;




/* Dynamic Code done */
/* import { useEffect, useState } from "react";
import axios from "axios";
import { GoArrowUpRight } from "react-icons/go";

const OfferBag = () => {
    const [offerData, setOfferData] = useState([]);

    useEffect(() => {
        axios
            .get("https://jsonplaceholder.typicode.com/comments?postId=1") // Replace with your actual API
            .then((response) => {
                setOfferData(response.data); // Data is an array
            })
            .catch((error) => {
                console.error("Error fetching offer data:", error);
            });
    }, []);

    return (
        <div className="relative max-w-full w-[1520px] mx-auto rounded-[20px] p-10 flex flex-wrap items-center gap-10 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 items-center p-4 md:p-8 rounded-xl w-full">
                
                <div className="h-auto min-h-[300px] sm:min-h-[500px] md:h-[719px] w-full bg-[#EBEBEB] rounded-tl-[36px] rounded-bl-[36px] flex justify-center items-center">
                    {offerData.length > 0 ? (
                        <img
                            src="https://via.placeholder.com/300" // Placeholder image
                            alt="Luxury Bag"
                            className="w-[200px] sm:w-[300px] md:w-[406px] h-auto object-cover rounded-xl max-w-full"
                        />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>

                
                <div className="w-full h-[719px] bg-orange-200 p-6 rounded-tr-[36px] rounded-br-[36px] flex justify-center items-center">
                    <div className="w-full max-w-[514px] h-full max-h-[463px] bg-white p-6 rounded-xl text-center shadow-md flex flex-col justify-center items-center">
                        <div className="w-full max-w-[333px] flex flex-col justify-center items-center mt-4 md:mt-8">
                            <h2 className="text-xl font-semibold">
                                {offerData.length > 0 ? offerData[0].name : "Loading..."}
                            </h2>
                            <p className="text-gray-500 mt-2 text-center">
                                {offerData.length > 0 ? offerData[0].body : ""}
                            </p>
                        </div>

                     
                        <div className="text-center mt-8 flex justify-start">
                            <button className="bg-black px-[32px] py-[10px] text-[14px] text-white font-semibold rounded-[36px] md:px-[48px] md:py-[14px] md:text-[16px]">
                                See Collection
                            </button>
                            <button className="bg-black p-[14px] text-white rounded-full md:p-[20px]">
                                <GoArrowUpRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferBag;
 */
