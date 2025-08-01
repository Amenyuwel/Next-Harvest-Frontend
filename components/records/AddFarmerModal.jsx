import React, { useState } from "react";
import { X } from "lucide-react";

const AddFarmerModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    rsbsaNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    crop: "",
    area: "",
    barangay: "",
    contact: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const fullName = `${formData.firstName} ${formData.lastName}`;
    onSubmit?.({
      ...formData,
      fullName,
    });
    setFormData({
      rsbsaNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      crop: "",
      area: "",
      barangay: "",
      contact: "",
    });
    onClose?.();
  };

  const handleCancel = () => {
    setFormData({
      rsbsaNumber: "",
      firstName: "",
      middleName: "",
      lastName: "",
      crop: "",
      area: "",
      barangay: "",
      contact: "",
    });
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-modal-bg)]">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            Add New Farmer
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="scrollbar-hide max-h-[600px] overflow-auto p-6">
          <div className="space-y-4">
            {/* RSBSA Number */}
            <div>
              <label
                htmlFor="rsbsaNumber"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                RSBSA Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="rsbsaNumber"
                name="rsbsaNumber"
                value={formData.rsbsaNumber}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,5}$/.test(value)) {
                    handleInputChange(e);
                  }
                }}
                placeholder="e.g., 00001"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                inputMode="numeric"
                pattern="\d{1,5}"
                required
              />
            </div>

            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Middle Name (optional) */}
            <div>
              <label
                htmlFor="middleName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Middle Name <span className="text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                placeholder="Enter middle name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Crop */}
            <div>
              <label
                htmlFor="crop"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Crop <span className="text-red-500">*</span>
              </label>
              <select
                id="crop"
                name="crop"
                value={formData.crop}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              ></select>
            </div>

            {/* Area */}
            <div>
              <label
                htmlFor="area"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Area (hectares) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="area"
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="e.g., 2.5 ha"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Barangay */}
            <div>
              <label
                htmlFor="barangay"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Barangay <span className="text-red-500">*</span>
              </label>
              <select
                id="barangay"
                name="barangay"
                value={formData.barangay}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              ></select>
            </div>

            {/* Contact */}
            <div>
              <label
                htmlFor="contact"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="+63 912 345 6790"
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
              Add Farmer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFarmerModal;
