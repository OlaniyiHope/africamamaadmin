// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminHeader from "../../Components/AdminHeader/AdminHeader";

// const CreateBrand = () => {
//   const [brandName, setBrandName] = useState("");
//   const [brandImage, setBrandImage] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("name", brandName);
//       if (brandImage) formData.append("image", brandImage);

//       await axios.post(`${import.meta.env.VITE_BASE_URL}/create-brand`, formData);

//       setBrandName("");
//       setBrandImage(null);
//       navigate("/brands");
//     } catch (error) {
//       console.error("Error creating brand:", error);
//     }
//   };

//   return (
//     <>
//       <AdminHeader />
//       <div className="p-6 max-w-2xl mx-auto">
//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           Add New Brand
//         </h2>

//         {/* Brand Name */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Brand Name
//           </label>
//           <input
//             type="text"
//             value={brandName}
//             onChange={(e) => setBrandName(e.target.value)}
//             placeholder="Enter brand name"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
//           />
//         </div>

//         {/* Brand Image */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Upload Brand Image
//           </label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setBrandImage(e.target.files[0])}
//             className="w-full"
//           />
//         </div>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <button
//             onClick={handleSubmit}
//             className="bg-purple-600 text-white px-4 py-2 rounded"
//             style={{ backgroundColor: "#042954" }}
//           >
//             Submit Brand
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CreateBrand;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const CreateBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [brandDescription, setBrandDescription] = useState(""); // 🆕 new state
  const [brandImage, setBrandImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", brandName);
      formData.append("description", brandDescription); // 🆕 send description
      if (brandImage) formData.append("image", brandImage);

      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/db/create-brand`,
        formData
      );

      // Reset fields
      setBrandName("");
      setBrandDescription(""); // 🆕 reset description
      setBrandImage(null);

      navigate("/brands");
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Add New Brand
        </h2>

        {/* Brand Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Brand Name
          </label>
          <input
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="Enter brand name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Brand Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Brand Description
          </label>
          <textarea
            value={brandDescription}
            onChange={(e) => setBrandDescription(e.target.value)}
            placeholder="Enter brand description"
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Brand Image */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Upload Brand Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBrandImage(e.target.files[0])}
            className="w-full"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white px-4 py-2 rounded"
            style={{ backgroundColor: "#b90705" }}
          >
            Submit Brand
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateBrand;
