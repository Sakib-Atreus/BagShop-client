/* eslint-disable react/prop-types */

import { motion } from "framer-motion";
const FeatureCard = ({ image, title, description, bgColor = "#E8DCD2" }) => {
  return (
    <motion.div
      className="p-6 rounded-2xl w-full h-auto flex flex-col items-center text-center shadow-lg cursor-pointer"
      style={{ backgroundColor: bgColor }} // Dynamic background color
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)" }} // Animation on hover
      transition={{ type: "spring", stiffness: 200, damping: 10 }}
    >
      <img src={image} alt={title} className=" h-[200px] mb-4" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;