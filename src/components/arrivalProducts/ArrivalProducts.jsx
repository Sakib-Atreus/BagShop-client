import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bag from "../../assets/arrival-image/bag.png";

const ArrivalProducts = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="w-[320px] rounded-[20px] overflow-hidden bg-white shadow-md transition-transform transform hover:scale-105 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image with Dark Overlay on Hover */}
      <div className="relative">
        <img
          src={bag}
          alt="Product Name"
          className={`w-full h-[400px] object-cover transition-all duration-300 ${
            isHovered ? "brightness-50" : "brightness-100"
          }`}
        />

        {/* Show Details Button on Hover (Centered) */}
        {isHovered && (
          <button
            onClick={() => navigate("/product-details")}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       bg-black text-white px-6 py-3 rounded-lg transition-opacity duration-300"
          >
            Show Details
          </button>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-lg font-semibold text-black">Product Name Here</h2>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-400 line-through text-lg">$150.00</span>
          <span className="text-black font-semibold text-lg">$120.00</span>
        </div>

        {/* Color Variants */}
        <div className="flex items-center gap-2 mt-3">
          <div className="w-6 h-6 rounded-full border-2 border-gold bg-transparent"></div>
          <div className="w-6 h-6 rounded-full bg-gray-900"></div>
          <div className="w-6 h-6 rounded-full bg-green-900"></div>
        </div>
      </div>
    </div>
  );
};

export default ArrivalProducts;
  