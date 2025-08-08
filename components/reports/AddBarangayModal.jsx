import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const AddBarangayModal = ({
  isOpen,
  onClose,
  onSubmit,
  onSuccess,
  editingData,
  isEditing,
}) => {
  const [formData, setFormData] = useState({
    barangayId: "",
    barangayName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Update form data when editing
  useEffect(() => {
    if (isEditing && editingData) {
      setFormData({
        barangayId: editingData.barangayId || "",
        barangayName: editingData.barangayName || "",
      });
    } else {
      setFormData({
        barangayId: "",
        barangayName: "",
      });
    }
    setError("");
  }, [isEditing, editingData, isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.barangayId || !formData.barangayName) {
      setError("Barangay ID and name are required");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Call the parent's onSubmit function directly
      // The parent will handle whether it's add or edit
      onSubmit?.(formData);
      onSuccess?.(formData);

      // Reset form and close modal
      setFormData({
        barangayId: "",
        barangayName: "",
      });
      onClose?.();
    } catch (err) {
      console.error("Error adding barangay:", err);
      setError(err.message || "Failed to add barangay. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      barangayId: "",
      barangayName: "",
    });
    setError("");
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-modal-bg)]">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            {isEditing ? "Edit Barangay" : "Add New Barangay"}
          </h2>
          <button
            onClick={handleCancel}
            disabled={isSubmitting}
            className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Barangay ID */}
            <div>
              <label
                htmlFor="barangayId"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Barangay ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="barangayId"
                name="barangayId"
                value={formData.barangayId}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,3}$/.test(value)) {
                    handleInputChange(e);
                  }
                }}
                placeholder="Enter barangay ID"
                inputMode="numeric"
                pattern="\d{1,3}"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Barangay Name */}
            <div>
              <label
                htmlFor="barangayName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Barangay Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="barangayName"
                name="barangayName"
                value={formData.barangayName}
                onChange={handleInputChange}
                placeholder="Enter barangay name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50"
                disabled={isSubmitting}
                required
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="mt-6 flex gap-3 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex-1 rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={
                isSubmitting || !formData.barangayId || !formData.barangayName
              }
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Adding..."
                : isEditing
                  ? "Update Barangay"
                  : "Add Barangay"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBarangayModal;
