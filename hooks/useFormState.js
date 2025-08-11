import { useState } from "react";

export const useFormState = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const resetForm = () => {
    setFormData(initialState);
    setError("");
    setIsSubmitting(false);
  };

  const setSubmitting = (submitting) => {
    setIsSubmitting(submitting);
  };

  const setFormError = (errorMessage) => {
    setError(errorMessage);
  };

  const updateFormData = (newData) => {
    setFormData(newData);
  };

  return {
    formData,
    isSubmitting,
    error,
    handleInputChange,
    resetForm,
    setSubmitting,
    setFormError,
    updateFormData,
  };
};
