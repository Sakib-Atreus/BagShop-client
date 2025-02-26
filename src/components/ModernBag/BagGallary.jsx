import { motion } from "framer-motion";
import bag1 from "../../assets/Bag-gallary/bag1.png";
import bag2 from "../../assets/Bag-gallary/bag2.png";
import bag3 from "../../assets/Bag-gallary/bag3.png";
import bag4 from "../../assets/Bag-gallary/bag4.png";
import bag5 from "../../assets/Bag-gallary/bag5.png";
import bag6 from "../../assets/Bag-gallary/bag6.png";
import bag7 from "../../assets/Bag-gallary/bag7.png";
import bag8 from "../../assets/Bag-gallary/bag8.png";
import bag9 from "../../assets/Bag-gallary/bag9.png";

const BagGallery = () => {
  return (
    <div className="w-full grid grid-cols-1 gap-3 justify-items-center">
      <div className="grid grid-cols-4 gap-2 place-items-stretch">
        <motion.div
          className="col-span-2"
          whileHover={{ scale: 1.1 }} // This will zoom the image slightly on hover
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag1} alt="img" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag2} alt="img" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag3} alt="img" />
        </motion.div>
      </div>

      <div className="grid grid-cols-4 gap-2 place-items-stretch">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag4} alt="img" />
        </motion.div>
        <motion.div
          className="col-span-2 gap-2"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img className="w-full" src={bag5} alt="img" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag6} alt="img" />
        </motion.div>
      </div>
      <div className="grid grid-cols-3 gap-2 place-items-stretch">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag7} alt="img" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag8} alt="img" />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <img src={bag9} alt="img" />
        </motion.div>
      </div>
    </div>
  );
};

export default BagGallery;
