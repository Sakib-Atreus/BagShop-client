/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CiHeart } from "react-icons/ci";
import { FiArrowUpRight } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToWishlist } from "../../redux/features/wishlistSlice";
import { useContext } from "react";
import { AuthContext } from "../../hooks/AuthContextProvider";

const CollectionCard = ({ product, index }) => {
  const { user, logout } = useContext(AuthContext);
  console.log(user?.userId);

  const userID = user?.userId;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bgColors = [
    "rgba(38, 38, 38, 0.40)",
    "#F0EDE6",
    "#ECE8E5",
    "#E2DCD0",
    "#E4D7CE",
    "#F0EDE6",
  ];

  const bgColor = bgColors[index % bgColors.length]; // Assign background color cyclically
  const productImage = product.variantId?.[0]?.images?.[0] || ""; // Get first image

  const handleViewDetails = () => {
    navigate(`/products/${product.variantId?.[0]?._id}`);
  };

  const handleWishList = (product) => {
    const productID = product?._id;
    console.log(product);
    if (!userID || !productID) {
      console.error("Error: userID or productID is missing", {
        userID,
        productID: product._id,
      });
      return;
    }
    dispatch(addToWishlist({ userID, productID }));
  };

  return (
    <Card
      className="w-[493px] h-[588px] rounded-3xl flex flex-col justify-between relative group transition-all duration-300"
      style={{ backgroundColor: bgColor }}
    >
      {/* Dark Overlay on Hover */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 rounded-3xl transition-opacity duration-300"></div>

      {/* Product Info */}
      <CardHeader className="relative z-10">
        <div className="flex justify-between mt-[32px]">
          <div>
            <p className="text-[20px] text-black">
              {product.name || "Product Name"}
            </p>
            <p className="font-bold mt-[12px] text-[24px] text-black">
              ${product.currentPrice || "N/A"}
            </p>
          </div>
          <button
            onClick={() => handleWishList(product)}
            className="w-[50px] h-[50px] rounded-full flex items-center bg-white justify-center"
          >
            <CiHeart className="w-[24px] h-[24px]" />
          </button>
        </div>
      </CardHeader>

      {/* Image Section */}
      <CardContent className="flex-grow flex items-end relative z-10">
        <div className="h-[330px] w-full">
          {productImage ? (
            <img
              src={productImage}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
          ) : (
            <p className="text-center text-gray-500">No Image Available</p>
          )}
        </div>

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            className="px-8 py-3 bg-black text-white rounded-full flex items-center"
            onClick={handleViewDetails} // Trigger navigation on click
          >
            View Details
          </button>

          <button
            className="w-[50px] h-[50px] bg-black text-white rounded-full flex items-center justify-center"
            onClick={handleViewDetails} // Also navigate on icon click
          >
            <FiArrowUpRight className="w-5 h-5" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollectionCard;
