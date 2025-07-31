import React, { useState } from "react";
import { X } from "lucide-react";

const AddBarangayModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    barangayNumber: "",
    barangayName: "",
    municipality: "",
    province: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit?.(formData);
    setFormData({
      barangayNumber: "",
      barangayName: "",
      municipality: "",
      province: "",
    });
    onClose?.();
  };

  const handleCancel = () => {
    setFormData({
      barangayNumber: "",
      barangayName: "",
      municipality: "",
      province: "",
    });
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-modal-bg)]">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add New Barangay
          </h2>
          <button
            onClick={handleCancel}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <div className="space-y-4">
            {/* Barangay Number */}
            <div>
              <label
                htmlFor="barangayNumber"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Barangay Number
              </label>
              <input
                type="text"
                id="barangayNumber"
                name="barangayNumber"
                value={formData.barangayNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,3}$/.test(value)) {
                    handleInputChange(e);
                  }
                }}
                placeholder="Enter barangay number"
                inputMode="numeric"
                pattern="\d{1,3}"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
            {/* Barangay Name */}
            <div>
              <label
                htmlFor="barangayName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Barangay Name
              </label>
              <input
                type="text"
                id="barangayName"
                name="barangayName"
                value={formData.barangayName}
                onChange={handleInputChange}
                placeholder="Enter barangay name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 flex gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
            >
              Add Barangay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBarangayModal;
