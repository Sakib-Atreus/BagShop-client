import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Image,
  Radio,
  RadioGroup,
} from "@heroui/react";
import CommonWrapper from "../components/CommonWrapper";
import { StarFilledIcon } from "@radix-ui/react-icons";
import ProductLabelWithValue from "../components/product-details/ProductLabelWithValue";
import { MinusIcon, PlusIcon, ShoppingBagIcon } from "lucide-react";
import NewsletterSection from "../components/closetProducts/NewsletterSection";
import ReviewTab from "../components/product-details/ReviewTab";
import { AuthContext } from "@/hooks/AuthContextProvider";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user } = useContext(AuthContext);
  const userId = user?.userId;




  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://our-bag-server.onrender.com/api/v1/products/${productId}`);
        setProduct(response.data.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  console.log(product, "fetching single product");

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }

  return (
    <div className="bg-white">
      {/* =====Header Section======= */}
      <div className="bg-gradient-to-r from-[#F1FBFF] via-[#F1EDEB] to-[#F8DAB0] flex flex-col items-center">
        <h1 className="text-[72px] font-bold">Product Details</h1>
        <div className="mt-10">
          <Breadcrumbs>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Shop</BreadcrumbItem>
            <BreadcrumbItem>{product.product.name}</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      {/* =======Product Main Details======= */}
      <CommonWrapper>
        <div className="flex gap-5 mt-10">
          {/* Image Section */}
          <div className="flex flex-col gap-3">
            <Image
              src={product.images?.[0] || "/placeholder.jpg"}
              width={700}
              height={700}
            />
            <div className="flex gap-2">
              {product.images?.slice(1, 5).map((img, i) => (
                <Image src={img} width={160} height={160} key={i} />
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div>
            {/* Rating */}
            <div className="flex items-center gap-5">
              <p className="h-8 font-semibold">{product.product.name}</p>
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <StarFilledIcon color="#FF9000" />
                  <StarFilledIcon color="#FF9000" />
                  <StarFilledIcon color="#FF9000" />
                  <StarFilledIcon color="#FF9000" />
                  <StarFilledIcon color="#FF9000" />
                </div>
                <p className="h-6">(4.5/5.0)</p>
              </div>
            </div>
            <Divider className="my-2 color-[#D9D9D9]" />

            <div className="max-w-[750px]">
              <p className="text-[#5A5C5F]">{product.product.description}</p>
              <div className="mt-4">
                <ProductLabelWithValue label="Brand" value={product.product.brand} />
                <ProductLabelWithValue label="Product Code" value={product.product.productCode} />
                <ProductLabelWithValue
                  label="Availability"
                  value={product.quantity > 0 ? "In stock" : "Out of stock"}
                />
                <RadioGroup color="secondary" label="Select Color">
                  <div className="flex gap-2">
                    <Radio value={product.colorName} color={product.colorHexCode} />
                  </div>
                </RadioGroup>
              </div>
              <p className="mt-3 text-[#050505] font-semibold">
                ${product.product.currentPrice}{" "}
                <span className="text-sm line-through font-normal text-[#5A5C5F]">
                  ${product.product.previousPrice}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1">
                <Button radius="sm" size="sm" isIconOnly>
                  <PlusIcon />
                </Button>
                <Button
                  radius="sm"
                  size="sm"
                  className="bg-transparent border border-gray-300"
                >
                  {1}
                </Button>
                <Button radius="sm" size="sm" isIconOnly>
                  <MinusIcon />
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Button radius="full" className="bg-black text-white">
                  Add To Cart
                </Button>
                <Button radius="full" className="bg-black text-white" isIconOnly>
                  <ShoppingBagIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CommonWrapper>

      {/* =======Review======= */}
      <ReviewTab product={product} />

      {/* =======News Letter======= */}
      <div className="mt-10">
        <NewsletterSection />
      </div>
    </div>
  );
};
export default ProductDetails;
