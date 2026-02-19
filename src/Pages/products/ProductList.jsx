import React, { useState, useEffect } from "react";
import { MoreVertical, Edit, Trash, Mail, UserPlus } from "lucide-react";
import { LuView } from "react-icons/lu";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/db/products`);
        const data = await res.json();
        const cleaned = Array.isArray(data) ? data : data.products || [];
        setProducts(cleaned.map((p) => ({ ...p, name: p.name.trim() })));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAction = async (action, product) => {
    setOpenDropdownId(null);

    switch (action) {
      case "view":
        navigate(`/product/${product._id}`);
        break;
      case "edit":
        navigate(`/edit-product/${product._id}`);
        break;
      case "delete":
        if (window.confirm("Are you sure you want to delete this product?")) {
          try {
            const response = await fetch(
              `${import.meta.env.VITE_BASE_URL}/db/product/${product._id}`,
              { method: "DELETE" }
            );
            if (response.ok) {
              setProducts((prev) => prev.filter((p) => p._id !== product._id));
            } else {
              const data = await response.json();
              alert("Failed to delete: " + data.message);
            }
          } catch (error) {
            console.error("Error deleting product:", error);
          }
        }
        break;
      default:
        break;
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="w-full px-3 lg:px-[8rem]">
        <div className="px-4 lg:px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
          <p className="text-gray-600 mt-1">View and manage all your food products</p>
        </div>

        {/* Search + Add */}
        <div className="lg:flex justify-between lg:space-x-5 space-y-4 lg:space-y-0 items-center mb-6">
          <input
            type="text"
            placeholder="Search product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="btn w-full lg:w-[20%]">
            <button
              className="px-6 py-3 text-white w-full rounded-md"
              onClick={() => navigate("/add-product")}
              style={{ backgroundColor: "#b90705" }}
            >
              Add New Product
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight / Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty Available</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (₦)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Original Price (₦)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Highlights</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.images?.[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                        No img
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {product.name}
                  </td>

                  {/* Category */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.category?.name || "—"}
                  </td>

                  {/* Weight / Unit */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.weight && product.unit
                      ? `${product.weight} ${product.unit}`
                      : "—"}
                  </td>

                  {/* Quantity */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {product.quantityAvailable ?? "—"}
                  </td>

                  {/* Current Price */}
                  <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                    ₦{product.price?.toLocaleString()}
                  </td>

                  {/* Original Price */}
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {product.originalPrice
                      ? <span className="line-through">₦{product.originalPrice?.toLocaleString()}</span>
                      : "—"}
                  </td>

                  {/* Highlights */}
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {product.isBestSeller && <span className="bg-yellow-100 text-yellow-700 px-1 rounded text-xs">Best Seller</span>}
                      {product.isTrending && <span className="bg-blue-100 text-blue-700 px-1 rounded text-xs">Trending</span>}
                      {product.isFeatured && <span className="bg-purple-100 text-purple-700 px-1 rounded text-xs">Featured</span>}
                      {product.isSpecial && <span className="bg-pink-100 text-pink-700 px-1 rounded text-xs">Special</span>}
                      {!product.isBestSeller && !product.isTrending && !product.isFeatured && !product.isSpecial && "—"}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 whitespace-nowrap text-center relative">
                    <button
                      onClick={() =>
                        setOpenDropdownId(openDropdownId === product._id ? null : product._id)
                      }
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>
                    {openDropdownId === product._id && (
                      <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button onClick={() => handleAction("view", product)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <LuView className="w-4 h-4 mr-2" /> View
                          </button>
                          <button onClick={() => handleAction("edit", product)}
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </button>
                          <button onClick={() => handleAction("delete", product)}
                            className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left">
                            <Trash className="w-4 h-4 mr-2" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}

              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center px-6 py-8 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ProductList;