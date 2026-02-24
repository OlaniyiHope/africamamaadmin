

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../../Components/AdminHeader/AdminHeader";

const EditCat = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [grandParents, setGrandParents] = useState([]);
  const [parents, setParents] = useState([]);
  const [children, setChildren] = useState([]);

  const [selectedGrandParent, setSelectedGrandParent] = useState("");
const [description, setDescription] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
const [allCategories, setAllCategories] = useState([]);
const [selectedParent, setSelectedParent] = useState("");

  // Fetch current category and all categories for dropdowns
  // useEffect(() => {
  //   const fetchCategory = async () => {
  //     try {
  //       // Fetch current category
  //       const { data: category } = await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/db/category/${id}`
  //       );

  //       setName(category.name);
  //       setPreview(category.image || "");

  //       // Fetch parent if exists
  //       if (category.parent) {
  //         const { data: parentCat } = await axios.get(
  //           `${import.meta.env.VITE_BASE_URL}/db/category/${category.parent}`
  //         );
  //         setSelectedParent(parentCat._id);
  //         setSelectedGrandParent(parentCat.parent || parentCat._id);
  //       } else {
  //         setSelectedGrandParent(category._id); // top-level
  //       }

  //       // Fetch all categories for dropdowns
  //       const { data: allCats } = await axios.get(
  //         `${import.meta.env.VITE_BASE_URL}/db/categories`
  //       );
  //       setGrandParents(allCats.filter((cat) => !cat.parent));
  //       setParents(
  //         allCats.filter((cat) => cat.parent === (category.parent || ""))
  //       );
  //       setChildren([]);
  //     } catch (err) {
  //       console.error("Failed to fetch category:", err);
  //     }
  //   };

  //   fetchCategory();
  // }, [id]);
useEffect(() => {
  const fetchData = async () => {
    try {
      // Fetch all categories
      const { data: categories } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/db/categories`
      );

      // Fetch current category
      const { data: category } = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/db/category/${id}`
      );

      setName(category.name);
      setPreview(category.image || "");
      setSelectedParent(category.parent || "");
      setDescription(category.description || "");

      // Build flattened category list with levels
      const buildTree = (cats, parent = null, level = 0) =>
        cats
          .filter((c) => String(c.parent) === String(parent))
          .flatMap((c) => [
            { ...c, level },
            ...buildTree(cats, c._id, level + 1),
          ]);

      const flattened = buildTree(categories);

      setAllCategories(flattened);
    } catch (err) {
      console.error("Failed to fetch category data:", err);
    }
  };

  fetchData();
}, [id]);

  // Handle dropdown changes
  const handleGrandParentChange = (e) => {
    const grandParentId = e.target.value;
    setSelectedGrandParent(grandParentId);
    setSelectedParent("");
    setSelectedChild("");

    const grandParent = grandParents.find((cat) => cat._id === grandParentId);
    setParents(grandParent?.children || []);
    setChildren([]);
  };

  const handleParentChange = (e) => {
    const parentId = e.target.value;
    setSelectedParent(parentId);
    setSelectedChild("");

    const parentCat = parents.find((cat) => cat._id === parentId);
    setChildren(parentCat?.children || []);
  };

  const handleChildChange = (e) => setSelectedChild(e.target.value);

  // Handle image upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  // Handle category update
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);

      // Determine correct parent
      let finalParent = null;
      if (selectedChild) finalParent = selectedChild;
      else if (selectedParent) finalParent = selectedParent;
      else if (selectedGrandParent && selectedGrandParent !== id)
        finalParent = selectedGrandParent;

      // Only append parent if it's not null
      if (finalParent) formData.append("parent", finalParent);

      if (image) formData.append("image", image);

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/db/category/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      navigate("/category");
    } catch (err) {
      console.error("Category update error:", err);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Category</h2>

        <div className="flex flex-col space-y-4">
          <div>
            <label className="block mb-2 font-medium">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Category Name"
              className="border px-4 py-2 rounded-md w-full"
            />
          </div>
          <div>
  <label className="block mb-2 font-medium">Description</label>
  <textarea
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    placeholder="Category description..."
    rows={4}
    className="border px-4 py-2 rounded-md w-full resize-y"
  />
</div>

          {/* <div>
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

          <div>
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

          <div>
            <label className="block mb-1 font-medium">Child Category</label>
            <select
              value={selectedChild}
              onChange={handleChildChange}
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
          </div> */}
<div>
  <label className="block mb-1 font-medium">
    Parent Category <span className="text-gray-500">(optional)</span>
  </label>

  <select
    value={selectedParent}
    onChange={(e) => setSelectedParent(e.target.value)}
    className="w-full p-2 border rounded"
  >
    <option value="">-- Top-level category --</option>

    {allCategories.map((cat) => (
      <option
        key={cat._id}
        value={cat._id}
        disabled={cat._id === id}
      >
        {`${"— ".repeat(cat.level)}${cat.name}`}
      </option>
    ))}
  </select>

  <p className="text-sm text-gray-500 mt-1">
    Leave empty to keep this category as a main category.
  </p>
</div>

          <div>
            <label className="block mb-2 font-medium">Category Image</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-md border"
              />
            )}
          </div>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4"
            style={{backgroundColor: "purple"}}
          >
            Update Category
          </button>
        </div>
      </div>
    </>
  );
};

export default EditCat;
