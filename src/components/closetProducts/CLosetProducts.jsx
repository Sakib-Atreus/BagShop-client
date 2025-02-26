/* eslint-disable react/prop-types */
import { Heart, ShoppingCart } from "lucide-react";
import bag from "../../assets/closet-image/image 7.png";

const ClosetProducts = ({ item, className, index }) => {
  console.log(item);
  const imageStyles =
    index === 0
      ? { width: "372px", height: "553px", marginTop: "90px" }
      : { width: "256px", height: "285px" };
  return (
    <div
      className={`flex flex-col items-center gap-2 flex-shrink-0 border border-gray-300 rounded-xl p-5 shadow-lg bg-white ${className}`}
    >
      {/* Top Section - Product Info & Icons */}
      <div className="w-full flex justify-between items-center">
        <div>
          <p className="text-black text-2xl font-bold">{item.name}</p>
          <p className="text-black text-xl font-semibold">{`$${item.currentPrice}`}</p>
        </div>

        {/* Icons Section */}
        <div className="flex gap-3">
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
            <Heart size={20} className="text-red-600" fill="currentColor" />
          </button>
          <button className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100">
            <ShoppingCart size={18} className="text-black" />
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex items-center justify-center">
        <img
          src={bag} // Assuming each item has an image property
          alt={item.name}
          className="object-contain z-20"
          style={imageStyles}
        />
      </div>
    </div>
  );
};

export default ClosetProducts;
