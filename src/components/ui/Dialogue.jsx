/* eslint-disable react/prop-types */
import { X } from "lucide-react";

const Dialog = ({
  open,
  onOpenChange,
  handleSubmit,
  children,
 
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-lg p-6 relative">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={() => onOpenChange(false)}
        >
          <X size={20} />
        </button>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {children}
          <div className="mt-6 flex justify-end gap-4">
            {/* Render custom close button */}
            {/* {closeButton && closeButton} */}
            {/* Render custom submit button */}
            {/* {submitButton && submitButton} */}
          </div>
        </form>
      </div>
    </div>
  );
};

// Sub-components for Dialog structure
const DialogContent = ({ children }) => <div className="mt-4">{children}</div>;
const DialogHeader = ({ children }) => <div className="text-xl font-bold">{children}</div>;
const DialogTitle = ({ children }) => <h2 className="text-lg font-semibold">{children}</h2>;
const DialogFooter = ({ children }) => <div className="mt-6 flex justify-end gap-4">{children}</div>;

// Export all components
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Title = DialogTitle;
Dialog.Footer = DialogFooter;

export default Dialog;
