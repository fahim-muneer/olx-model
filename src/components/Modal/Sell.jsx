import { Modal, ModalBody } from "flowbite-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSell } from "../../Redux/SellModal";
import clos from "../../assets/clos.svg";
import { addDoc, collection } from "firebase/firestore";
import { fireStore } from "../Firebase/Firebase";
import fileUpload from "../../assets/fileUpload.svg";
import { useForm } from "react-hook-form";

function SellRHF() {
  const status = useSelector((state) => state.sell.openSellModal);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "unsigned_preset");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dos7qs69i/image/upload",
      { method: "POST", body: formData }
    );
    const data = await response.json();
    if (!data.secure_url) throw new Error("Image upload failed");
    return data.secure_url;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }
    setImage(file);
  };

  const onSubmit = async (data) => {
    if (!user) return alert("Please login first");
    if (!image) return alert("Please upload an image");

    try {
      setSubmitting(true);

      const imageUrl = await uploadImageToCloudinary();

      await addDoc(collection(fireStore, "products"), {
        ...data, 
        imageUrl,
        userId: user.uid,
        userName: user.name || "Anonymous",
        createdAt: new Date(),
      });

      dispatch(closeSell());
      reset();
      setImage(null);
      alert("File posted")
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      show={status}
      onClose={() => dispatch(closeSell())}
      position="center"
      size="md"
      popup
    >
      <ModalBody className="bg-white p-6 rounded-md">
        <img
          src={clos}
          className="w-6 absolute top-6 right-8 cursor-pointer"
          onClick={() => dispatch(closeSell())}
        />

        <p className="font-bold text-lg mb-3">Sell Item</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="border p-2 w-full rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <input
            {...register("category", { required: "Category is required" })}
            placeholder="Category"
            className="border p-2 w-full rounded"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}

          <input
            type="number"
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
            placeholder="Price"
            className="border p-2 w-full rounded"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}

          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Description"
            className="border p-2 w-full rounded"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message}
            </p>
          )}

          <div className="pt-2">
            {image ? (
              <div className="h-48 border rounded flex justify-center items-center">
                <img
                  src={URL.createObjectURL(image)}
                  className="object-contain h-full"
                />
              </div>
            ) : (
              <div className="h-48 border rounded relative">
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center h-full">
                  <img src={fileUpload} className="w-12" />
                  <p>Click to upload image</p>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-[#002f34] text-white w-full mt-4 py-2 rounded"
          >
            {submitting ? "Posting..." : "Post Item"}
            
          </button>
        </form>
      </ModalBody>
    </Modal>
  );
}

export default SellRHF;