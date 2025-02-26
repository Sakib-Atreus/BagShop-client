import { useEffect, useState } from "react";
import axios from "axios";
import { Breadcrumbs, BreadcrumbItem } from "@heroui/react";
import NewsletterSection from "../components/closetProducts/NewsletterSection";
import { ChevronDown, ArrowLeft, ArrowRight, Menu } from "lucide-react";
import FilterSection from "../components/side-bar/FilterSection";

const NewArrival = () => {
  const [products, setProducts] = useState([]); // Store API products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products
  const [loading, setLoading] = useState(true);

  //pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const totalProducts = products.length; // Example: Assuming products array is populated
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Fetch Products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://our-bag-server.onrender.com/api/v1/products/all-product"
        );
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Set initial filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#F1FBFF] via-[#F1EDEB] to-[#F8DAB0] h-[437px] flex flex-col items-center justify-center">
        <h1 className="text-[72px] font-bold text-center">New Arrival</h1>
        <div>
          <Breadcrumbs>
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>New Arrival</BreadcrumbItem>
          </Breadcrumbs>
        </div>
      </div>

      {/* Sidebar and Sorting Section */}
      <div className="flex flex-col lg:flex-row mt-20 px-4 lg:px-20">
        {/* Sidebar */}
        <div className="lg:w-[349px] bg-white p-[24px] shadow-md">
          <FilterSection
            products={products}
            setFilteredProducts={setFilteredProducts}
          />
        </div>

        {/* Main Content Section */}
        <div className="flex-1 lg:pl-20">
          {/* Display Filtered Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="text-center text-lg">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-red-500">
                No products match your filters.
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg p-4 text-center"
                >
                  {/* Product Image */}
                  <div className="relative group">
                    <img
                      src={
                        product.variantId?.[0]?.images?.[0] ||
                        "/placeholder.jpg"
                      }
                      alt={product.name}
                      className="w-full h-56 object-contain mb-4 transition-all duration-300 group-hover:brightness-50"
                    />

                    {/* View Details Button (Hidden by Default) */}
                    <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      View Details
                    </button>
                  </div>

                  {/* Product Name */}
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  {/* Product Price */}
                  <p className="text-lg font-semibold mt-2">
                    ${product.currentPrice}
                  </p>

                  {/* Product Color */}
                  {product.variantId?.[0]?.colorHexCode && (
                    <div className="flex justify-center mt-2">
                      <span
                        className="w-6 h-6 rounded-full border border-gray-300"
                        style={{
                          backgroundColor: product.variantId[0].colorHexCode,
                        }}
                      ></span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Pagination Section */}

      <div className="flex justify-center items-center gap-2 mt-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${
            currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ArrowLeft size={18} />
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              currentPage === i + 1
                ? "text-black font-bold bg-gray-300"
                : "border border-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 ${
            currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-200"
          }`}
        >
          <ArrowRight size={18} />
        </button>
      </div>
      {/* Newsletter Section */}
      <div className="mt-16 px-4 lg:px-20">
        <NewsletterSection />
      </div>
    </div>
  );
};

export default NewArrival;
