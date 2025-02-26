const ProductLabelWithValue = ({ label, value }) => {
  return (
    <div class="flex items-center py-1 space-x-2">
      <span class="font-bold text-sm">{label}:</span>
      <span class="text-gray-700 text-xs">{value}</span>
    </div>
  );
};

export default ProductLabelWithValue;
