/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const FilterSection = ({ products, setFilteredProducts }) => {
  const [filters, setFilters] = useState({
    designers: [],
    bagTypes: [],
    colors: [],
    priceRange: { min: 0, max: 395 },
  });

  // ** Safely Extract Unique Designers, Bag Types, and Colors **
  const uniqueDesigners = [...new Set(products.map((p) => p.designer).filter(Boolean))];
  const uniqueBagTypes = [...new Set(products.map((p) => p.bagType).filter(Boolean))];
  const uniqueColors = [
    ...new Set(
      products.flatMap((p) => (p.variantId && p.variantId.length ? p.variantId.map((v) => v.colorHexCode) : []))
    ),
  ].filter(Boolean);

  console.log("Available Designers:", uniqueDesigners);
  console.log("Available Bag Types:", uniqueBagTypes);
  console.log("Available Colors:", uniqueColors);

  // Handle Checkbox Change
  const handleCheckboxChange = (category, value) => {
    setFilters((prevFilters) => {
      const updatedCategory = prevFilters[category].includes(value)
        ? prevFilters[category].filter((item) => item !== value)
        : [...prevFilters[category], value];

      return { ...prevFilters, [category]: updatedCategory };
    });
  };

  // Handle Price Change
  const handlePriceChange = (event) => {
    const max = Number(event.target.value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { ...prevFilters.priceRange, max },
    }));
  };

  // Handle Color Selection
  const handleColorClick = (color) => {
    setFilters((prevFilters) => {
      const updatedColors = prevFilters.colors.includes(color)
        ? prevFilters.colors.filter((c) => c !== color)
        : [...prevFilters.colors, color];

      return { ...prevFilters, colors: updatedColors };
    });
  };

  // **Apply Filters and update Shop.jsx via setFilteredProducts**
  useEffect(() => {
    const updatedFilteredProducts = products.filter((product) => {
      const { designers, bagTypes, colors, priceRange } = filters;

      // Filter by Designer
      const matchesDesigner = designers.length === 0 || designers.includes(product.designer);

      // Filter by Bag Type
      const matchesBagType = bagTypes.length === 0 || bagTypes.includes(product.bagType);

      // Filter by Color
      const matchesColor =
        colors.length === 0 ||
        (product.variantId && product.variantId.some((v) => colors.includes(v.colorHexCode)));

      // Filter by Price
      const matchesPrice = product.currentPrice >= priceRange.min && product.currentPrice <= priceRange.max;

      return matchesDesigner && matchesBagType && matchesColor && matchesPrice;
    });

    setFilteredProducts(updatedFilteredProducts);
  }, [filters, products, setFilteredProducts]);

  return (
    <div className="w-[350px] bg-gradient-to-r from-[#F1FBFF] via-[#F1EDEB] to-[#F8DAB0] rounded-lg shadow-md p-6">
      <div className="bg-white px-4">
        <h3 className="text-lg font-semibold mb-4">Filter</h3>

        {/* Designers Filter */}
        <div className="mb-4">
          <p className="font-medium mb-2">Designers</p>
          {uniqueDesigners.length > 0 ? (
            uniqueDesigners.map((designer) => (
              <label key={designer} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.designers.includes(designer)}
                  onChange={() => handleCheckboxChange("designers", designer)}
                  className="mr-2"
                />
                {designer}
              </label>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No designers found</p>
          )}
        </div>

        {/* Bag Type Filter */}
        <div className="mb-4">
          <p className="font-medium mb-2">Bag Type</p>
          {uniqueBagTypes.length > 0 ? (
            uniqueBagTypes.map((bagType) => (
              <label key={bagType} className="block text-sm">
                <input
                  type="checkbox"
                  checked={filters.bagTypes.includes(bagType)}
                  onChange={() => handleCheckboxChange("bagTypes", bagType)}
                  className="mr-2"
                />
                {bagType}
              </label>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No bag types available</p>
          )}
        </div>

        {/* Color Filter */}
        <div className="mb-4">
          <p className="font-medium mb-2">Color</p>
          {uniqueColors.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {uniqueColors.map((color) => (
                <span
                  key={color}
                  onClick={() => handleColorClick(color)}
                  className={`w-6 h-6 rounded-full cursor-pointer ${
                    filters.colors.includes(color) ? "border-2 border-black" : "border border-gray-300"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No colors available</p>
          )}
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <p className="font-medium mb-2">Price</p>
          <input
            type="range"
            min="0"
            max="395"
            value={filters.priceRange.max}
            step="1"
            onChange={handlePriceChange}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>$0</span>
            <span>${filters.priceRange.max}</span>
          </div>
        </div>
      </div>

      {/* Filtered Products Count */}
      <p className="mt-4 text-center text-sm font-medium">
        {products.length === 0 ? "Loading..." : `${products.length} total products`}
      </p>
    </div>
  );
};

export default FilterSection;
