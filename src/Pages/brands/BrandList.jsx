// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import AdminHeader from "../../Components/AdminHeader/AdminHeader";

// const BrandList = () => {
//   const [brands, setBrands] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchBrands = async () => {
//       try {
//         const { data } = await axios.get(
//           `${import.meta.env.VITE_BASE_URL}/brands`
//         );
//         setBrands(data);
//       } catch (error) {
//         console.error("Error fetching brands:", error);
//       }
//     };
//     fetchBrands();
//   }, []);

//   const filteredBrands = brands.filter((brand) =>
//     brand.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleDelete = async (brandId) => {
//     try {
//       await axios.delete(`${import.meta.env.VITE_BASE_URL}/brands/${brandId}`);
//       setBrands(brands.filter((brand) => brand._id !== brandId));
//     } catch (error) {
//       console.error("Error deleting brand:", error);
//     }
//   };

//   return (


//     <>
//     <AdminHeader />
//     <div className="w-full px-3 lg:px-[8rem]">
//         <div className="px-4 lg:px-8 py-6">
//           <h1 className="text-2xl font-bold text-gray-800">All Brands</h1>
//           <p className="text-gray-600 mt-1">
//             View and manage all brands
//           </p>
//         </div>

//       <div className="lg:flex justify-between lg:space-x-5 space-y-4 lg:space-y-0 items-center mb-6">
//         <input
//           type="text"
//           placeholder="Search brands..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <div className="btn w-full lg:w-[20%]">
//           <button
//             className="px-6 py-3 bg-secondary text-white w-full rounded-md hover:bg-blue-600"
//             onClick={() => navigate("/add-brand")}
//             style={{ backgroundColor: "#042954" }}
//           >
//             Add New Brand
//           </button>
//         </div>
//       </div>

//       <div className="border rounded-lg overflow-hidden">
//         <div
//           className="bg-secondary px-6 py-3"
//           style={{ backgroundColor: "#042954" }}
//         >
//           <span className="text-gray-100 font-semibold text-lg">Brands</span>
//         </div>

//         <div className="divide-y divide-gray-200 px-6 py-4 bg-[#042954]">
//           {filteredBrands.length > 0 ? (
//             filteredBrands.map((brand) => (
//               <div
//                 key={brand._id}
//                 className="flex items-center justify-between py-2"
//               >
//                 <div className="flex items-center space-x-3">
//                   {brand.image ? (
//                     <img
//                       src={brand.image}
//                       alt={brand.name}
//                       className="w-10 h-10 object-contain rounded"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 bg-gray-300 rounded" />
//                   )}
//                   <span className="text-white font-medium">{brand.name}</span>
//                 </div>
//                 <div>
//                   <button
//                     onClick={() => handleDelete(brand._id)}
//                     className="text-red-500 hover:text-red-700 ml-2"
//                     style={{ color: "white" }}
//                   >
//                     Delete
//                   </button>
//                   <button
//                     className="ml-2 text-blue-500 hover:text-blue-700"
//                     onClick={() => navigate(`/edit-brand/${brand._id}`)}
//                     style={{ color: "white" }}
//                   >
//                     Edit
//                   </button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 italic">No brands found</p>
//           )}
//         </div>
//       </div>
//     </div>

//     </>
//   );
// };

// export default BrandList;
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/db/brands`
        );
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };
    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (brandId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/db/brands/${brandId}`);
      setBrands(brands.filter((brand) => brand._id !== brandId));
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="w-full px-3 lg:px-[8rem]">
        <div className="px-4 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">All Brands</h1>
          <p className="text-gray-600 mt-1">View and manage all brands</p>
        </div>

        <div className="lg:flex justify-between lg:space-x-5 space-y-4 lg:space-y-0 items-center mb-6">
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="btn w-full lg:w-[20%]">
            <button
              className="px-6 py-3 bg-secondary text-white w-full rounded-md hover:bg-blue-600"
              onClick={() => navigate("/add-brand")}
              style={{ backgroundColor: "#b90705" }}
            >
              Add New Brand
            </button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div
            className="bg-secondary px-6 py-3"
            style={{ backgroundColor: "#b90705" }}
          >
            <span className="text-gray-100 font-semibold text-lg">Brands</span>
          </div>

          <div className="divide-y divide-gray-200 px-6 py-4 bg-[#b90705]">
            {filteredBrands.length > 0 ? (
              filteredBrands.map((brand) => (
                <div
                  key={brand._id}
                  className="flex items-start justify-between py-3"
                >
                  {/* Brand Info */}
                  <div className="flex items-start space-x-3">
                    {brand.image ? (
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="w-12 h-12 object-contain rounded"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded" />
                    )}
                    <div>
                      <span className="text-white font-medium text-lg block">
                        {brand.name}
                      </span>
                      {brand.description && (
                        <p className="text-gray-300 text-sm mt-1">
                          {brand.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDelete(brand._id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                      style={{ color: "white" }}
                    >
                      Delete
                    </button>
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-700"
                      onClick={() => navigate(`/edit-brand/${brand._id}`)}
                      style={{ color: "white" }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No brands found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandList;
