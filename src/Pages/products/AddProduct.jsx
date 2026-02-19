import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ArrayInputField = ({ label, values, setValues }) => {
  const [input, setInput] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) {
      setValues([...values, trimmed]);
      setInput("");
    }
  };

  const handleRemove = (item) => setValues(values.filter((v) => v !== item));

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {values.map((val) => (
          <span key={val} className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full flex items-center gap-1">
            {val}
            <button type="button" onClick={() => handleRemove(val)} className="text-red-500 font-bold">×</button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
          placeholder={`Add ${label.toLowerCase()}`}
          className="flex-1 p-2 border rounded"
        />
        <button type="button" onClick={handleAdd}
          className="px-4 py-2 text-white rounded"
          style={{ backgroundColor: "#b90705" }}>+</button>
      </div>
    </div>
  );
};

const AddProduct = () => {
  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("kg");
  const [quantityAvailable, setQuantityAvailable] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const [expiryInfo, setExpiryInfo] = useState("");
  const [storageInfo, setStorageInfo] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [allergens, setAllergens] = useState([]);
  const [productTag, setProductTag] = useState([]);
  const [features, setFeatures] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isTrending, setIsTrending] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isSpecial, setIsSpecial] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/db/categories`);
        const data = Array.isArray(res.data) ? res.data : res.data.categories || [];
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > MAX_IMAGES) return toast.error(`Max ${MAX_IMAGES} images allowed.`);
    if (files.some((f) => f.size > MAX_IMAGE_SIZE)) return toast.error("Each image must be under 5MB.");
    setProductImages(files);
  };

  const handleSubmit = async () => {
    if (!productName.trim()) return toast.error("Product name is required");
    if (!productPrice) return toast.error("Price is required");

    setLoading(true);
    try {
      const formData = new FormData();

      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("weight", weight);
      formData.append("unit", unit);
      formData.append("quantityAvailable", quantityAvailable);
      formData.append("minimumQuantity", minimumQuantity);
      formData.append("expiryInfo", expiryInfo);
      formData.append("storageInfo", storageInfo);

      ingredients.forEach((i) => formData.append("ingredients", i));
      allergens.forEach((a) => formData.append("allergens", a));
      productTag.forEach((t) => formData.append("tag", t));
      features.forEach((f) => formData.append("features", f));

      if (selectedCategory) formData.append("category", selectedCategory);

      productImages.forEach((img) => formData.append("images", img));

      formData.append("isBestSeller", isBestSeller);
      formData.append("isTrending", isTrending);
      formData.append("isFeatured", isFeatured);
      formData.append("isSpecial", isSpecial);

      await axios.post(`${import.meta.env.VITE_BASE_URL}/db/create-product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Product added successfully!");
      setTimeout(() => navigate("/products"), 3100);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>

        <div className="mb-4">
          <label className="block font-medium mb-1">Product Name</label>
          <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
            placeholder="e.g. Jollof Rice Mix" className="w-full p-2 border rounded" />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Description</label>
          <textarea value={productDescription} onChange={(e) => setProductDescription(e.target.value)}
            rows={3} placeholder="Describe the product..." className="w-full p-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Price (₦)</label>
            <input type="number" value={productPrice} onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Quantity Available</label>
            <input type="number" value={quantityAvailable} onChange={(e) => setQuantityAvailable(e.target.value)}
              className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Weight / Volume</label>
            <input type="text" value={weight} onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 500" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Unit</label>
            <select value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full p-2 border rounded">
              <option value="kg">kg</option>
              <option value="g">g</option>
              <option value="litre">Litre</option>
              <option value="ml">ml</option>
              <option value="pack">Pack</option>
              <option value="piece">Piece</option>
              <option value="dozen">Dozen</option>
              <option value="carton">Carton</option>
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Minimum Order Quantity</label>
          <input type="number" value={minimumQuantity} min={1}
            onChange={(e) => setMinimumQuantity(e.target.value)} className="w-full p-2 border rounded" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block font-medium mb-1">Shelf Life / Expiry Info</label>
            <input type="text" value={expiryInfo} onChange={(e) => setExpiryInfo(e.target.value)}
              placeholder="e.g. 12 months" className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block font-medium mb-1">Storage Instructions</label>
            <input type="text" value={storageInfo} onChange={(e) => setStorageInfo(e.target.value)}
              placeholder="e.g. Keep refrigerated" className="w-full p-2 border rounded" />
          </div>
        </div>

        <ArrayInputField label="Ingredients" values={ingredients} setValues={setIngredients} />
        <ArrayInputField label="Allergens" values={allergens} setValues={setAllergens} />
        <ArrayInputField label="Tags" values={productTag} setValues={setProductTag} />
        <ArrayInputField label="Features / Highlights" values={features} setValues={setFeatures} />

        {/* Single Category Dropdown */}
        <div className="mb-4">
          <label className="block font-medium mb-1">Category</label>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 border rounded">
            <option value="">-- Select Category --</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Product Images (max 5)</label>
          <input type="file" multiple accept="image/*" onChange={handleImageChange} className="w-full" />
        </div>

        <div className="mb-6">
          <label className="block font-medium mb-2">Product Highlights</label>
          <div className="flex gap-4 flex-wrap">
            {[
              ["isBestSeller", "Best Seller", isBestSeller, setIsBestSeller],
              ["isTrending", "Trending", isTrending, setIsTrending],
              ["isFeatured", "Featured", isFeatured, setIsFeatured],
              ["isSpecial", "Special", isSpecial, setIsSpecial],
            ].map(([key, label, val, setter]) => (
              <label key={key} className="flex items-center gap-2">
                <input type="checkbox" checked={val} onChange={(e) => setter(e.target.checked)} />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end">
          <button onClick={handleSubmit} disabled={loading}
            className="px-6 py-2 text-white rounded"
            style={{ backgroundColor: loading ? "#ccc" : "#b90705" }}>
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;