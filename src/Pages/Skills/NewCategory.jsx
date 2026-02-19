

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminHeader from "../../Components/AdminHeader/AdminHeader";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { toast } from "react-toastify";

// const NewCategory = () => {
//   const [categoryName, setCategoryName] = useState("");
//   const [categoryImage, setCategoryImage] = useState(null);
//   const [selectedIcon, setSelectedIcon] = useState("");
//   const [parentCategories, setParentCategories] = useState([]);
//   const [selectedParent, setSelectedParent] = useState(""); 
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/db/categories`
//         );
//         setParentCategories(data);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // const handleSubmit = async () => {
//   //   try {
//   //     const formData = new FormData();
//   //     formData.append("name", categoryName);
//   //     formData.append("icon", selectedIcon);
//   //     if (categoryImage) formData.append("image", categoryImage);
//   //     if (selectedParent) formData.append("parent", selectedParent);

//   //     await axios.post(`${import.meta.env.VITE_BASE_URL}/db/category`, formData);

//   //     setCategoryName("");
//   //     setCategoryImage(null);
//   //     setSelectedIcon("");
//   //     setSelectedParent("");
//   //     navigate("/category");
//   //   } catch (error) {
//   //     console.error("Error creating category:", error);
//   //   }
//   // };

//   // Recursive function to flatten categories with indentation
  
  
//   const handleSubmit = async () => {
//   if (!categoryName.trim()) {
//     toast.error("Category name is required");
//     return;
//   }

//   try {
//     setIsSubmitting(true);

//     const formData = new FormData();
//     formData.append("name", categoryName);
//     if (selectedIcon) formData.append("icon", selectedIcon);
//     if (categoryImage) formData.append("image", categoryImage);
//     if (selectedParent) formData.append("parent", selectedParent);

//     await axios.post(
//       `${import.meta.env.VITE_BASE_URL}/db/category`,
//       formData
//     );

//     toast.success("Category created successfully 🎉");

//     setCategoryName("");
//     setCategoryImage(null);
//     setSelectedIcon("");
//     setSelectedParent("");

//     setTimeout(() => {
//       navigate("/category");
//     }, 1000);
//   } catch (error) {
//     console.error("Error creating category:", error);
//     toast.error(
//       error?.response?.data?.error || "Failed to create category"
//     );
//   } finally {
//     setIsSubmitting(false);
//   }
// };

  
// const renderCategoryOptions = (categories, level = 0) => {
//   if (!Array.isArray(categories)) return null; // guard

//   return categories.map((cat) => (
//     <React.Fragment key={cat._id}>
//       <option value={cat._id}>
//         {`${"— ".repeat(level)}${cat.name}`}
//       </option>
//       {cat.children && cat.children.length > 0 &&
//         renderCategoryOptions(cat.children, level + 1)}
//     </React.Fragment>
//   ));
// };

//   return (
//     <>
//       <AdminHeader />
//           <ToastContainer position="top-right" autoClose={3000} />
//       <div className="p-6 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Add New Category
//         </h2>

//         {/* Category Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Category Name
//           </label>
//           <input
//             type="text"
//             value={categoryName}
//             onChange={(e) => setCategoryName(e.target.value)}
//             placeholder="Enter category name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         {/* Category Image */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Upload Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setCategoryImage(e.target.files[0])}
//             className="w-full"
//           />
//         </div>



//         {/* Parent Category Dropdown */}
//         {/* <div className="mb-4">
//      <label>
//   Parent Category <span className="text-sm text-gray-500">(optional)</span>
// </label>

//           <select
//             value={selectedParent}
//             onChange={(e) => setSelectedParent(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//           >
//          <option value="">-- Top-level category (no parent) --</option>

//             {renderCategoryOptions(parentCategories)}
//           </select>
//           <p className="text-sm text-gray-500 mt-1">
//   Leave this empty to create a main category (e.g. <b>Women</b>).
//   Select a category to create a sub-category (e.g. <b>Women → Bags</b>).
// </p>

//         </div> */}

//         {/* Submit Button */}
//         {/* <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-purple-600 text-white px-4 py-2 rounded"
//             style={{ backgroundColor: "#b90705" }}
//           >
//             Submit Category
//           </button>
//         </div> */}
//         <div className="flex justify-end">
//   <button
//     onClick={handleSubmit}
//     disabled={isSubmitting}
//     className={`px-4 py-2 rounded text-white transition ${
//       isSubmitting
//         ? "bg-gray-400 cursor-not-allowed"
//         : "bg-purple-600 hover:opacity-90"
//     }`}
//     style={!isSubmitting ? { backgroundColor: "#b90705" } : {}}
//   >
//     {isSubmitting ? "Submitting..." : "Submit Category"}
//   </button>
// </div>

//       </div>
//     </>
//   );
// };

// export default NewCategory;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("name", categoryName);
      if (categoryImage) formData.append("image", categoryImage);
      // No parent = top-level category (backend defaults to null)

      await axios.post(`${import.meta.env.VITE_BASE_URL}/db/category`, formData);

      toast.success("Category created successfully 🎉");
      setCategoryName("");
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