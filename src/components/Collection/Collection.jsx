import { useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import CommonWrapper from "../CommonWrapper";
import CollectionCard from "./CollectionCard";
import useCollectionProducts from "../../lib/Products";
import gridImage from "../../assets/collection/twogrid/1.png";
import { GoArrowUpRight } from "react-icons/go";
import FeatureCard from "../ui/FeatureCard";
import recycle from "../../assets/card-image/recycle.png";
import diamond from "../../assets/card-image/diamond.png";
import delivery from "../../assets/card-image/delivery.png";
import NewsletterSection from "../closetProducts/NewsletterSection";

const Collection = () => {
  const [selectedCollection, setSelectedCollection] = useState("option-one");
  const { products: collectionProducts, isLoading } = useCollectionProducts();

  const handleCollectionChange = (value) => {
    setSelectedCollection(value);
  };

  console.log(collectionProducts);

  return (
    <div className="mt-[140px] bg-white">
      <CommonWrapper>
        <div>
          <RadioGroup
            value={selectedCollection}
            onValueChange={handleCollectionChange}
            className="flex justify-between px-[150px]"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-one"
                id="option-one"
                className="text-black border-black"
              />
              <Label htmlFor="option-one" className="text-[48px] font-[600]">
                All Collection
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-two"
                id="option-two"
                className="text-black border-black"
              />
              <Label
                htmlFor="option-two text-geist"
                className="text-[48px] font-[600]"
              >
                New Collection
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="option-three"
                id="option-three"
                className="text-black border-black"
              />
              <Label
                htmlFor="option-three text-geist"
                className="text-[48px] font-[600]"
              >
                What&apos;s Hot
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Conditional Rendering of Collection Cards */}
        {isLoading ? (
          <p className="text-center mt-10 text-lg">Loading...</p>
        ) : (
          <div className="mt-[75px] grid grid-cols-3 gap-[10px]">
            {Array.isArray(collectionProducts?.data) &&
            collectionProducts.data.length > 0 ? (
              collectionProducts.data
                .slice(0, 6)
                .map((product, i) => (
                  <CollectionCard key={i} product={product} index={i} />
                ))
            ) : (
              <p className="text-center text-red-500">No products available</p>
            )}
          </div>
        )}
        {/* Rest of the content */}
        <div className="mt-[140px] flex">
          <div
            className="h-[719px] w-full  flex items-center justify-center"
            style={{
              background:
                "linear-gradient(459deg, rgba(255, 255, 255, 1) -18.59%, rgba(235, 235, 235, 1) 100%)",
            }}
          >
            <img src={gridImage} alt="" className="w-[406px] h-[404px]" />
          </div>
          <div className="h-[719px] w-full  bg-[#F8DAB0] flex items-center justify-center">
            <div className="bg-white w-[514px] h-[463px] rounded-3xl pt-[6rem] ">
              <div className="flex justify-center">
                <button className="flex px-12 py-3 justify-center items-center gap-2 border border-black rounded-[36px] bg-white text-black hover:opacity-90 font-semibold">
                  offers
                </button>
              </div>
              <div className="text-[24px] text-center pt-8">
                Exclusive bag offers awaits
              </div>
              <div className="text-center text-[16px] pt-4">
                Lorem ipsum dolor sit amet consectetur. Phasellus ornare vitae
                in urna suspendisse elit arcu tellus.
              </div>
              <div className="flex justify-center mt-6">
                <button className="bg-black px-[48px] py-[14px] text-[16px] text-white font-semibold rounded-[36px]">
                  Try Now
                </button>
                <button className="bg-black p-[20px] text-white rounded-full">
                  <GoArrowUpRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="text-[48px] font-bold pt-12">Collection List</div>
          <div className="grid grid-cols-3 gap-[10px] mt-[40px]">
            {/* {collectionProducts.slice(0, 3).map((card, i) => (
              <CollectionCard card={card} key={i} />
            ))} */}
          </div>
        </div>

        <div className="text-[48px] font-bold text-center pt-16">
          We Supported By
        </div>
        <div className="flex justify-center gap-4 mt-8">
          <div>
            <FeatureCard
              image={recycle}
              description={
                "Lorem ipsum dolor sit amet consectetur. Mattis egestas nulla nibh dictumst felis commodo id aliquet."
              }
              title={"24 Hour Return Policy"}
              bgColor="#E4D7CE"
            />
          </div>
          <div>
            <FeatureCard
              image={delivery}
              description={
                "Lorem ipsum dolor sit amet consectetur. Mattis egestas nulla nibh dictumst felis commodo id aliquet."
              }
              title={"Fast & Secure Delivery"}
              bgColor="#F1ECE6"
            />
          </div>
          <div>
            <FeatureCard
              image={diamond}
              description={
                "Lorem ipsum dolor sit amet consectetur. Mattis egestas nulla nibh dictumst felis commodo id aliquet."
              }
              title={"Free Shipping on $100+"}
              bgColor="#F8DAB0"
            />
          </div>
        </div>

        <div className="mt-32">
          <NewsletterSection />
        </div>

        <div>
          <div className="text-[48px] font-bold pt-16">Best Selling Bag</div>
          <div className="grid grid-cols-3 gap-[10px] mt-[40px]">
            {/* {collectionProducts.slice(0, 3).map((card, i) => (
              <CollectionCard card={card} key={i} />
            ))} */}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
};

export default Collection;
