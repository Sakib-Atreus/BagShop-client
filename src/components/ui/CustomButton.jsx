/* eslint-disable react/prop-types */
const Button = ({ children, onClick, variant = "default", className = "", ...props }) => {
    // Define button styles based on the variant
    const baseStyles = "px-4 py-2 rounded-md font-medium transition-all duration-200";
    const variants = {
      default: "bg-blue-500 text-white hover:bg-blue-600",
      destructive: "bg-red-500 text-white hover:bg-red-600",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
      ghost: "text-gray-700 hover:bg-gray-200",
    };
  
    return (
      <button
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  