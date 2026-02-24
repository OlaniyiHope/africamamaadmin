
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");  // ← ADD
  const [categoryImage, setCategoryImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", categoryName);
      formData.append("description", categoryDescription);  // ← ADD
      if (categoryImage) formData.append("image", categoryImage);

      await axios.post(`${import.meta.env.VITE_BASE_URL}/db/category`, formData);

      toast.success("Category created successfully 🎉");
      setCategoryName("");
      setCategoryDescription("");   // ← ADD
      setCategoryImage(null);

      setTimeout(() => navigate("/category"), 1000);
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error(error?.response?.data?.error || "Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AdminHeader />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Category</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* ← ADD THIS BLOCK */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Category Description</label>
          <textarea
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            placeholder="Enter category description (optional)"
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white transition ${
              isSubmitting ? "bg-gray-400 cursor-not-allowed" : "hover:opacity-90"
            }`}
            style={!isSubmitting ? { backgroundColor: "#b90705" } : {}}
          >
            {isSubmitting ? "Submitting..." : "Submit Category"}
          </button>
        </div>
      </div>
    </>
  );
};

export default NewCategory;