import modern1 from "../../assets/Bag-gallary/modern1.png";
import modern2 from "../../assets/Bag-gallary/modern2.png";
import { FiArrowUpRight } from "react-icons/fi";

const modernBag = [
    { logo: modern1, title: "Modern Quality and Mind Refreshing Color Bag " },
    { logo: modern2, title: "Modern Quality and Mind Refreshing Color Bag  " },
  ];
const ModernBag = () => {
  return (
    <div className="flex flex-col md:flex-row items-center  gap-4 font-Geist">
    {modernBag.map((item, i) => (
      <div className="max-w-[750px] max-h-[730px] relative" key={i}>
        <img className="w-full h-full" src={item.logo} alt={item.title} />
        <div className="w-full flex items-center justify-between gap-10 absolute top-4 px-8">
          <h2 className="max-w-[350px] odd:text-2xl even:text-3xl odd:font-semibold even:font-normal">
            {item.title}
          </h2>
          <button className="text-[#050505] text-xl rounded-full p-5 bg-white ">
            <FiArrowUpRight />
          </button>
        </div>
      </div>
    ))}
  </div>
  )
}

export default ModernBag