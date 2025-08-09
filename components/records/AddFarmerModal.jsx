import React, { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AddFarmerModal = ({
  isOpen,
  onClose,
  onSubmit,
  editingData,
  isEditing,
}) => {
  // Use environment variable for API URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    crop: "",
    area: "",
    barangay: "",
    contact: "",
  });

  const [barangays, setBarangays] = useState([]);
  const [crops, setCrops] = useState([]);
  const [loadingBarangays, setLoadingBarangays] = useState(false);
  const [loadingCrops, setLoadingCrops] = useState(false);

  // Barangay search states
  const [barangaySearch, setBarangaySearch] = useState("");
  const [showBarangayDropdown, setShowBarangayDropdown] = useState(false);
  const [filteredBarangays, setFilteredBarangays] = useState([]);

  // Crop search states
  const [cropSearch, setCropSearch] = useState("");
  const [showCropDropdown, setShowCropDropdown] = useState(false);
  const [filteredCrops, setFilteredCrops] = useState([]);

  // Contact display state
  const [contactDisplay, setContactDisplay] = useState("");

  // Submitting state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch barangays and crops when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchBarangays();
      fetchCrops();
    }
  }, [isOpen]);

  // Populate form when editing
  useEffect(() => {
    if (isEditing && editingData && barangays.length > 0 && crops.length > 0) {
      // Find barangay name
      const barangay = barangays.find(
        (b) => b.barangayId === editingData.barangay,
      );
      const crop = crops.find((c) => c.cropId === editingData.crop);

      setFormData({
        firstName: editingData.firstName || "",
        middleName: editingData.middleName || "",
        lastName: editingData.lastName || "",
        crop: editingData.crop || "",
        area: editingData.area || "",
        barangay: editingData.barangay || "",
        contact: editingData.contact || "",
      });

      // Set search displays
      setBarangaySearch(barangay ? barangay.barangayName : "");
      setCropSearch(
        crop
          ? crop.cropName.charAt(0).toUpperCase() +
              crop.cropName.slice(1).toLowerCase()
          : "",
      );

      // Format contact for display
      if (editingData.contact) {
        const contact = editingData.contact.toString();
        if (contact.startsWith("63") && contact.length === 12) {
          const number = contact.slice(2);
          setContactDisplay(
            `+63 ${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`,
          );
        } else if (contact.length === 10 && contact.startsWith("9")) {
          setContactDisplay(
            `+63 ${contact.slice(0, 3)} ${contact.slice(3, 6)} ${contact.slice(6)}`,
          );
        } else {
          setContactDisplay(contact);
        }
      }
    } else if (!isEditing) {
      // Reset form for new farmer
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        crop: "",
        area: "",
        barangay: "",
        contact: "",
      });
      setBarangaySearch("");
      setCropSearch("");
      setContactDisplay("");
    }
  }, [isEditing, editingData, barangays, crops]);

  // Filter barangays based on search
  useEffect(() => {
    if (barangaySearch) {
      const filtered = barangays.filter((barangay) =>
        barangay.barangayName
          .toLowerCase()
          .includes(barangaySearch.toLowerCase()),
      );
      setFilteredBarangays(filtered);
    } else {
      setFilteredBarangays(barangays);
    }
  }, [barangaySearch, barangays]);

  // Filter crops based on search
  useEffect(() => {
    if (cropSearch) {
      const filtered = crops.filter((crop) =>
        crop.cropName.toLowerCase().includes(cropSearch.toLowerCase()),
      );
      setFilteredCrops(filtered);
    } else {
      setFilteredCrops(crops);
    }
  }, [cropSearch, crops]);

  const fetchBarangays = async () => {
    setLoadingBarangays(true);
    try {
      const response = await fetch(`${API_URL}/api/barangays`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setBarangays(result.data);
          setFilteredBarangays(result.data);
        } else {
          console.error("API returned error:", result.message);
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch barangays:", response.status, errorText);
      }
    } catch (error) {
      console.error("Network error fetching barangays:", error);
    } finally {
      setLoadingBarangays(false);
    }
  };

  const fetchCrops = async () => {
    setLoadingCrops(true);
    try {
      const response = await fetch(`${API_URL}/api/crops`);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setCrops(result.data);
        } else {
          console.error("API returned error:", result.message);
        }
      } else {
        const errorText = await response.text();
        console.error("Failed to fetch crops:", response.status, errorText);
      }
    } catch (error) {
      console.error("Network error fetching crops:", error);
    } finally {
      setLoadingCrops(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBarangaySearch = (e) => {
    const value = e.target.value;
    setBarangaySearch(value);
    setShowBarangayDropdown(true);
  };

  const handleBarangaySelect = (barangay) => {
    setFormData((prev) => ({
      ...prev,
      barangay: barangay.barangayId,
    }));
    setBarangaySearch(barangay.barangayName);
    setShowBarangayDropdown(false);
  };

  const handleCropSearch = (e) => {
    const value = e.target.value;
    setCropSearch(value);
    setShowCropDropdown(true);
  };

  const handleCropSelect = (crop) => {
    setFormData((prev) => ({
      ...prev,
      crop: crop.cropId,
    }));
    setCropSearch(
      crop.cropName.charAt(0).toUpperCase() +
        crop.cropName.slice(1).toLowerCase(),
    );
    setShowCropDropdown(false);
  };

  const handleContactChange = (e) => {
    let value = e.target.value;

    // Remove all non-digit characters
    value = value.replace(/\D/g, "");

    // If starts with 63, keep it
    if (value.startsWith("63")) {
      // Limit to 12 digits total (63 + 10 digits)
      value = value.slice(0, 12);

      // Format as +63 XXX XXX XXXX
      if (value.length > 2) {
        if (value.length <= 5) {
          value = `+63 ${value.slice(2)}`;
        } else if (value.length <= 8) {
          value = `+63 ${value.slice(2, 5)} ${value.slice(5)}`;
        } else {
          value = `+63 ${value.slice(2, 5)} ${value.slice(5, 8)} ${value.slice(8)}`;
        }
      } else {
        value = `+63`;
      }
    }
    // If starts with 9 (typical PH mobile number without country code)
    else if (value.startsWith("9")) {
      // Limit to 10 digits for mobile number
      value = value.slice(0, 10);

      // Format as +63 9XX XXX XXXX
      if (value.length <= 3) {
        value = `+63 ${value}`;
      } else if (value.length <= 6) {
        value = `+63 ${value.slice(0, 3)} ${value.slice(3)}`;
      } else {
        value = `+63 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
      }
    }
    // If empty or other cases, show +63 prefix
    else if (value === "") {
      value = "";
    }
    // For other numbers, add +63 prefix
    else {
      // Limit to 10 digits
      value = value.slice(0, 10);

      if (value.length > 0) {
        if (value.length <= 3) {
          value = `+63 ${value}`;
        } else if (value.length <= 6) {
          value = `+63 ${value.slice(0, 3)} ${value.slice(3)}`;
        } else {
          value = `+63 ${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6)}`;
        }
      }
    }

    // Update form data with the raw number (digits only) for submission
    const rawNumber = value.replace(/\D/g, "");
    setFormData((prev) => ({
      ...prev,
      contact: rawNumber,
    }));

    // Update display value
    setContactDisplay(value);
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      middleName: "",
      lastName: "",
      crop: "",
      area: "",
      barangay: "",
      contact: "",
    });
    setBarangaySearch("");
    setCropSearch("");
    setContactDisplay("");
    setShowBarangayDropdown(false);
    setShowCropDropdown(false);
    onClose?.();
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      console.log("API_URL:", API_URL);
      console.log("Is Editing:", isEditing);

      let farmerData;
      let response;

      if (isEditing) {
        // Update existing farmer
        const fullName = `${formData.firstName} ${formData.lastName}`;
        farmerData = {
          ...formData,
          fullName,
        };

        console.log("Updating farmer with data:", farmerData);

        response = await fetch(`${API_URL}/api/farmers/${editingData._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(farmerData),
        });
      } else {
        // Create new farmer
        const rsbsaNumber = await generateRSBSANumber(formData.barangay);
        const fullName = `${formData.firstName} ${formData.lastName}`;
        farmerData = {
          ...formData,
          rsbsaNumber,
          fullName,
        };

        console.log("Generated RSBSA:", rsbsaNumber);
        console.log("Creating farmer with data:", farmerData);

        response = await fetch(`${API_URL}/api/farmers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(farmerData),
        });
      }

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(
          errorData.message ||
            `Failed to ${isEditing ? "update" : "create"} farmer`,
        );
      }

      const result = await response.json();
      console.log(
        `✅ Farmer ${isEditing ? "updated" : "created"} successfully:`,
        result,
      );

      // Show success message
      toast.success(
        `Farmer ${isEditing ? "updated" : "added"} successfully!${!isEditing ? ` RSBSA: ${farmerData.rsbsaNumber}` : ""}`,
        {
          duration: 4000,
          position: "top-right",
        },
      );

      // Call onSubmit prop to notify parent component
      onSubmit?.(result.data || farmerData);

      // Reset form
      setFormData({
        firstName: "",
        middleName: "",
        lastName: "",
        crop: "",
        area: "",
        barangay: "",
        contact: "",
      });
      setBarangaySearch("");
      setCropSearch("");
      setContactDisplay("");
      onClose?.();
    } catch (error) {
      console.error(
        `❌ Error ${isEditing ? "updating" : "creating"} farmer:`,
        error,
      );
      toast.error(`Error: ${error.message}`, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to generate RSBSA number
  const generateRSBSANumber = async (barangayId) => {
    try {
      // Get farmer count for this barangay
      const response = await fetch(
        `${API_URL}/api/farmers/count/${barangayId}`,
      );

      if (!response.ok) {
        throw new Error("Failed to get farmer count");
      }

      const result = await response.json();
      const farmerCount = result.data.count || 0;

      // Find the selected barangay to get its barangayId
      const selectedBarangay = barangays.find(
        (b) => b.barangayId === barangayId,
      );
      if (!selectedBarangay) {
        throw new Error("Selected barangay not found");
      }

      // Format: 126303-000-00000
      const staticPart = "126303";
      const barangayPart = selectedBarangay.barangayId
        .toString()
        .padStart(3, "0");
      const farmerPart = (farmerCount + 1).toString().padStart(5, "0");

      return `${staticPart}-${barangayPart}-${farmerPart}`;
    } catch (error) {
      console.error("Error generating RSBSA:", error);
      throw error;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white shadow-xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-gray-200 p-6">
          <h2 className="text-lg font-bold text-[var(--color-text-primary)]">
            {isEditing ? "Edit Farmer" : "Add New Farmer"}
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

            {/* Crop Search */}
            <div className="relative">
              <label
                htmlFor="crop"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Crop <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="crop"
                  value={cropSearch}
                  onChange={handleCropSearch}
                  onFocus={() => setShowCropDropdown(true)}
                  placeholder={
                    loadingCrops ? "Loading crops..." : "Search crop..."
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={loadingCrops}
                  required
                />
                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
                />
              </div>

              {/* Crop Dropdown */}
              {showCropDropdown &&
                !loadingCrops &&
                filteredCrops.length > 0 && (
                  <div className="scrollbar-hide absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
                    {filteredCrops.map((crop) => (
                      <div
                        key={crop._id}
                        onClick={() => handleCropSelect(crop)}
                        className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {crop.cropName.charAt(0).toUpperCase() +
                          crop.cropName.slice(1).toLowerCase()}
                      </div>
                    ))}
                  </div>
                )}

              {/* No crop results */}
              {showCropDropdown &&
                !loadingCrops &&
                filteredCrops.length === 0 &&
                cropSearch && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No crops found
                    </div>
                  </div>
                )}
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

            {/* Barangay Search */}
            <div className="relative">
              <label
                htmlFor="barangay"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Barangay <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="barangay"
                  value={barangaySearch}
                  onChange={handleBarangaySearch}
                  onFocus={() => setShowBarangayDropdown(true)}
                  placeholder={
                    loadingBarangays
                      ? "Loading barangays..."
                      : "Search barangay..."
                  }
                  className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  disabled={loadingBarangays}
                  required
                />
                <ChevronDown
                  size={20}
                  className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400"
                />
              </div>

              {/* Barangay Dropdown */}
              {showBarangayDropdown &&
                !loadingBarangays &&
                filteredBarangays.length > 0 && (
                  <div className="scrollbar-hide absolute z-10 mt-1 max-h-40 w-full overflow-y-auto rounded-md border border-gray-300 bg-white shadow-lg">
                    {filteredBarangays.map((barangay) => (
                      <div
                        key={barangay._id}
                        onClick={() => handleBarangaySelect(barangay)}
                        className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {barangay.barangayName}
                      </div>
                    ))}
                  </div>
                )}

              {/* No barangay results */}
              {showBarangayDropdown &&
                !loadingBarangays &&
                filteredBarangays.length === 0 &&
                barangaySearch && (
                  <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg">
                    <div className="px-3 py-2 text-sm text-gray-500">
                      No barangays found
                    </div>
                  </div>
                )}
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
                value={contactDisplay}
                onChange={handleContactChange}
                placeholder="+63 912 345 6789"
                maxLength="17"
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

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  disabled={isSubmitting}
                  className="flex-1 rounded-md bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
                >
                  {isSubmitting
                    ? isEditing
                      ? "Updating Farmer..."
                      : "Adding Farmer..."
                    : isEditing
                      ? "Update Farmer"
                      : "Add Farmer"}
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {isEditing ? "Confirm Update" : "Confirm Addition"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {isEditing
                      ? `Are you sure you want to update the farmer information for ${formData.firstName} ${formData.lastName}? This will modify the existing record.`
                      : `Are you sure you want to add ${formData.firstName} ${formData.lastName} as a new farmer? This will create a new farmer record.`}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleSubmit}
                    className={
                      isEditing
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "bg-green-600 hover:bg-green-700"
                    }
                  >
                    {isEditing ? "Update Farmer" : "Add Farmer"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddFarmerModal;
