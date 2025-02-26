import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="text-center mt-10 text-lg">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }
  console.log(product)

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold">{product.productId?.name || "No Product Name"}</h1>
    </div>
  );
};

export default ProductDetails;
