import CommonWrapper from "../CommonWrapper";
import BagGallery from "../ModernBag/BagGallary";
import ModernBag from "../ModernBag/ModernBag";


const DummyTwo = () => {
  return <div className=" bg-white">
    <CommonWrapper>
      <div className="mt-20">
      <ModernBag/>
      </div>
     <div className="mt-24">
     <BagGallery/>
     </div>
    </CommonWrapper>
  </div>;
};

export default DummyTwo;
