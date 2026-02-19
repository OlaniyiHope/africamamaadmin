import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const EditProduct = () => {
      const { id } = useParams()
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState(0);
  const [productSize, setProductSize] = useState("");
  const [closureType, setClosureType] = useState("");
  const [existingImages, setExistingImages] = useState([]);

  const [productTag, setProductTag] = useState("");
  const [productISBN, setProductISBN] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [language, setLanguage] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantityAvailable, setQuantityAvailable] = useState(0);
  const [minimumQuantity, setMinimumQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

const [decorationMethods, setDecorationMethods] = useState([
  { name: "", note: "" },
]);

  const [features, setFeatures] = useState("");
  const [material, setMaterial] = useState("");
  const [weight, setWeight] = useState("");
  const [brand, setBrand] = useState("");

  const [images, setImages] = useState([]);
  const [brands, setBrands] = useState([]);

  const [videoOrAudioFile, setVideoOrAudioFile] =  useState(null);
  const [supportingFile, setSupportingFile] = useState(null);
  const [loading, setLoading] = useState(false);


  const [grandParents, setGrandParents] = useState([]);
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  const [selectedGrandParent, setSelectedGrandParent] = useState("");
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState("");

  const [newSubCategory, setNewSubCategory] = useState("");
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

const fetchCategories = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/db/categories`);
    const allCategories = res.data;

    setGrandParents(allCategories); // They are already top-level categories
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};
 const fetchBrands = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/db/brands`);
      setBrands(res.data); // assuming API returns [{ _id, name, image }]
    } catch (error) {
      console.error("Failed to fetch brands:", error);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch(`${import.meta.env.VITE_BASE_URL}/products`);
//         const data = await res.json();

//         console.log("Fetched products:", data);

//         const cleanedProducts = data.map((product) => ({
//           ...product,
//           name: product.name.trim(),
//         }));

//         setProducts(cleanedProducts);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

// const fetchProduct = async () => {
//   try {
//     const res = await axios.get(
//       `${import.meta.env.VITE_BASE_URL}/product/${id}`
//     );
//     const product = res.data;
// console.log("📦 Full product from API:", product);

//     // Populate states
//     setProductName(product.name || "");
//     console.log("✅ names nsames from API:", product.name);
//     setProductDescription(product.description || "");
//     setProductPrice(product.price || "");
//     setDiscountPrice(product.discountPrice || "");
//     setProductQuantity(product.quantityAvailable || 0);
//     setProductSize(product.size?.join(", ") || "");
//     setMaterial(product.material || "");
//     setWeight(product.weight || "");
//     setBrand(product.brand?._id || "");
//       setClosureType(product.closureType || "");
//     setExistingImages(product.images || []);
  
//  console.log("✅ closureType from API:", product.closureType);
//     // If you also want to prefill tags, features, decoration methods, and colors:
//     setProductTag(product.tag?.join(", ") || "");
//     setFeatures(product.features?.join(", ") || "");
//     setDecorationMethods(product.decorationMethods || []);
//     setSelectedColors(product.color || []); // assuming product.color is an array
//   } catch (error) {
//     console.error("❌ Failed to fetch product:", error);
//   }
// };
const fetchProduct = async () => {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/db/product/${id}`
    );
    const product = res.data;
    console.log("📦 Full product from API:", product);

    // Populate states
    setProductName(product.name || "");
    setProductDescription(product.description || "");
    setProductPrice(product.price || "");
    setDiscountPrice(product.discountPrice || "");
    setProductQuantity(product.quantityAvailable || 0);
    setProductSize(product.size?.join(", ") || "");
    setMaterial(product.material || "");
    setWeight(product.weight || "");
    setBrand(product.brand?._id || "");
    setClosureType(product.closureType || "");
    setExistingImages(product.images || []);

    // ✅ Handle categories
    if (product.category) {
      if (!product.category.parent) {
        // Category has no parent → it's a grandparent
        setSelectedGrandParent(product.category._id);
      } else {
        // Category has parent → child or parent
        setSelectedChild(product.category._id);

        // fetch parent details
        const parentRes = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/db/categories/${product.category.parent}`
        );
        const parentCat = parentRes.data;
        setSelectedParent(parentCat._id);

        if (parentCat.parent) {
          setSelectedGrandParent(parentCat.parent);
        }
      }
    }

    setProductTag(product.tag?.join(", ") || "");
    setFeatures(product.features?.join(", ") || "");
    setDecorationMethods(product.decorationMethods || []);
    setSelectedColors(product.color || []);
  } catch (error) {
    console.error("❌ Failed to fetch product:", error);
  }
};


  useEffect(() => {
    fetchBrands();
    fetchProduct();
  }, [id]);

  // Handle new image selection


const handleGrandParentChange = (e) => {
  const grandParentId = e.target.value;
  setSelectedGrandParent(grandParentId);
  setSelectedParent("");
  setSelectedChild("");

  // find the selected grandparent
  const grandParent = grandParents.find(cat => cat._id === grandParentId);
  setParents(grandParent ? grandParent.children : []);
  setChildren([]);
};

const handleParentChange = (e) => {
  const parentId = e.target.value;
  setSelectedParent(parentId);
  setSelectedChild("");

  const parent = parents.find(cat => cat._id === parentId);
  setChildren(parent ? parent.children : []);
};



  const handleAddSubCategory = () => {
    if (newSubCategory.trim() !== "") {
      setSubCategories([...subCategories, newSubCategory.trim()]);
      setNewSubCategory("");
    }
  };

  const handleRemoveSubCategory = (index) => {
    const updated = [...subCategories];
    updated.splice(index, 1);
    setSubCategories(updated);
  };

  useEffect(() => {
    fetchCategories();
  }, []);
// Predefined colors (can also fetch from backend if you want dynamic)
const availableColors = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Red", hex: "#FF0000" },
  { name: "Blue", hex: "#0000FF" },
  { name: "Green", hex: "#008000" },
  { name: "Yellow", hex: "#FFFF00" },
  { name: "Purple", hex: "#800080" },
  { name: "Gray", hex: "#808080" },
  { name: "Navy", hex: "#001F54" },
  { name: "Orange", hex: "#FFA500" },
];

const [selectedColors, setSelectedColors] = useState([]);

// Handle selecting/unselecting colors
const toggleColor = (color) => {
  if (selectedColors.includes(color)) {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  } else {
    if (selectedColors.length < 10) {
      setSelectedColors([...selectedColors, color]);
    }
  }
};

// Submit update
const handleSubmit = async () => {
  setLoading(true);

  try {
    const formData = new FormData();

    if (productName) formData.append("name", productName);
    if (productDescription) formData.append("description", productDescription);
    if (productPrice) formData.append("price", productPrice);
    if (discountPrice) formData.append("discountPrice", discountPrice);
    if (productQuantity) formData.append("quantityAvailable", productQuantity);
    if (productSize) formData.append("size", productSize);
    if (material) formData.append("material", material);
    if (weight) formData.append("weight", weight);
    if (brand) formData.append("brand", brand);
    if (closureType) formData.append("closureType", closureType);
    if (productTag) formData.append("tags", productTag.split(","));
    if (features) formData.append("features", features.split(","));
if (decorationMethods.length > 0) {
  decorationMethods.forEach((method, i) => {
    formData.append(`decorationMethods[${i}][name]`, method.name);
    formData.append(`decorationMethods[${i}][note]`, method.note);
  });
}

    if (selectedColors.length > 0) {
      formData.append("colors", JSON.stringify(selectedColors));
    }
    if (selectedGrandParent) formData.append("grandParentCategory", selectedGrandParent);
    if (selectedParent) formData.append("parentCategory", selectedParent);
    if (selectedChild) formData.append("childCategory", selectedChild);
// Only keep old images if no new ones were selected
if (productImages.length === 0 && existingImages.length > 0) {
  formData.append("existingImages", JSON.stringify(existingImages));
}

// Add new images if any
if (productImages.length > 0) {
  productImages.forEach((image) => {
    formData.append("images", image);
  });
}


    const res = await axios.put(
      `${import.meta.env.VITE_BASE_URL}/db/product/${id}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    console.log("✅ Product updated:", res.data);
    navigate("/products");
  } catch (error) {
    console.error("❌ Error updating product:", error);
  } finally {
    setLoading(false);
  }
};


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files); // ✅ Convert to array
    setProductImages(files);
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
         Edit Product
        </h2>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Product Description
          </label>
          <textarea
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            placeholder="Enter product description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Product Price */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Price</label>
            <input
              type="number"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Discount Price</label>
            <input
              type="number"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        {/* Quantity, Size, Language */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Quantity</label>
            <input
              type="number"
              value={productQuantity}
              onChange={(e) => setProductQuantity(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Size</label>
            <input
              value={productSize}
              onChange={(e) => setProductSize(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        
        </div>
 {/* Grandparent Category */}
   <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Material</label>
            <input
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
    <div>
  <label className="block mb-1 font-medium">Weight</label>
  <select
    value={weight}
    onChange={(e) => setWeight(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select Weight --</option>
    <option value="Lightweight">Lightweight</option>
    <option value="Mediumweight">Mediumweight</option>
    <option value="Heavyweight">Heavyweight</option>
  </select>
</div>

        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
      <div>
        <label className="block mb-1 font-medium">Brand</label>
        <select
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">-- Select Brand --</option>
          {brands.map((b) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
<div className="mb-4">
  <label className="block mb-1 font-medium">Closure Type</label>
  <select
    value={closureType}
    onChange={(e) => setClosureType(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select Closure Type --</option>
    <option value="No Closure">No Closure</option>
    <option value="Zipper">Zipper</option>
    <option value="Buttons">Buttons</option>
    <option value="Hooks">Hooks</option>
    <option value="Velcro">Velcro</option>
  </select>
</div>

        </div>

        {/* Array fields */}
        {[

       
          { label: "Tags (comma separated)", state: productTag, setter: setProductTag },
       
          { label: "Features (comma separated)", state: features, setter: setFeatures },
        ].map(({ label, state, setter }) => (
          <div key={label} className="mb-4">
            <label className="block mb-1 font-medium">{label}</label>
            <input
              value={state}
              onChange={(e) => setter(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
<label className="block mb-1 font-medium">Decoration Methods</label>
<div className="space-y-2">
  {decorationMethods.map((method, idx) => (
    <div key={idx} className="flex gap-2">
      <select
        value={method.name}
        onChange={(e) => {
          const updated = [...decorationMethods];
          updated[idx].name = e.target.value;
          setDecorationMethods(updated);
        }}
        className="p-2 border rounded w-1/2"
      >
        <option value="">-- Select Method --</option>
        <option value="Printed">Printed</option>
        <option value="Embroidered">Embroidered</option>
        <option value="Debossed">Debossed</option>
      </select>
      <input
        type="text"
        placeholder="Note (e.g. No Minimum)"
        value={method.note || ""}
        onChange={(e) => {
          const updated = [...decorationMethods];
          updated[idx].note = e.target.value;
          setDecorationMethods(updated);
        }}
        className="p-2 border rounded w-1/2"
      />
    </div>
  ))}
</div>

<button
  type="button"
  onClick={() =>
    setDecorationMethods([...decorationMethods, { name: "", note: "" }])
  }
  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
>
  + Add Decoration Method
</button>


<div className="mb-4">
  <label className="block mb-2 font-medium">Select Colors</label>
  <div className="flex flex-wrap gap-2">
    {availableColors.map((color) => (
      <div
        key={color.name}
        className={`w-10 h-10 rounded cursor-pointer border-2 ${
          selectedColors.includes(color.name)
            ? "border-blue-500"
            : "border-gray-300"
        }`}
        style={{ backgroundColor: color.hex }}
        onClick={() => toggleColor(color.name)}
      />
    ))}
  </div>
  <div className="mt-2 text-sm text-gray-600">
    Selected: {selectedColors.join(", ") || "None"}
  </div>
</div>


        {/* Parent Category */}
  {/* Grandparent */}
<div className="mb-4">
  <label className="block mb-1 font-medium">Grandparent Category</label>
  <select
    value={selectedGrandParent}
    onChange={handleGrandParentChange}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Select Grandparent --</option>
    {grandParents.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

{/* Parent */}
<div className="mb-4">
  <label className="block mb-1 font-medium">Parent Category</label>
  <select
    value={selectedParent}
    onChange={handleParentChange}
    className="w-full p-2 border rounded"
    disabled={!parents.length}
  >
    <option value="">-- Select Parent --</option>
    {parents.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>

{/* Child */}
<div className="mb-4">
  <label className="block mb-1 font-medium">Child Category</label>
  <select
    value={selectedChild}
    onChange={(e) => setSelectedChild(e.target.value)}
    className="w-full p-2 border rounded"
    disabled={!children.length}
  >
    <option value="">-- Select Child --</option>
    {children.map((cat) => (
      <option key={cat._id} value={cat._id}>
        {cat.name}
      </option>
    ))}
  </select>
</div>


        {/* Product Type */}
     
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload Product Images</label>
    <input
  type="file"
  multiple
  accept="image/*"
  onChange={(e) => {
    const files = [...e.target.files];
    setProductImages(files);
    setExistingImages([]); // hide old images once new ones are chosen
  }}
/>


        </div>
<div className="flex gap-2 mt-2">
  {/* Existing images (from DB) */}
  {existingImages.map((img, idx) => (
    <img
      key={`existing-${idx}`}
      src={img}
      alt="existing"
      className="w-20 h-20 object-cover border"
    />
  ))}

  {/* New images (not yet uploaded) */}
  {productImages.map((file, idx) => (
    <img
      key={`new-${idx}`}
      src={URL.createObjectURL(file)}
      alt="new"
      className="w-20 h-20 object-cover border"
    />
  ))}
</div>

  

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            style={{ backgroundColor: "#042954" }}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
