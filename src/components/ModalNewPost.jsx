import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import useAuthStore from "../store/storeAuth";
import { db, storage } from "../firebase";
import ImageFilter from "./ImageFilter";
import { collection, addDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "../store/storePosts";

const { useCreatePostStore } = store;

function ModalNewPost({ isOpen, setIsOpen }) {
  const {
    selectedImage,
    description,
    isFilterOpen,
    setSelectedImage,
    setDescription,
    setIsFilterOpen,
    handleImageChange,
    handleUploadClick,
  } = useCreatePostStore();
  const { user } = useAuthStore();

  const handleUpload = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para crear un post");
      return;
    }
    handleUploadClick();
    handleClose();
  };

  const handleClose = () => {
    setSelectedImage(null);
    setDescription("");
    setIsFilterOpen(false);
    setIsOpen(false);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-xl mx-auto p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={handleClose}
              >
                &times;
              </button>

              <h2 className="text-lg font-semibold mb-4">Subir imágenes</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                capture="environment"
                className="mb-4"
              />
              {selectedImage && (
                <div className="flex">
                  <div className="w-1/2">
                    <ImageFilter imageSrc={selectedImage} />
                  </div>

                  <div className="w-1/2 ml-4 bg-gray-100 p-4 rounded-lg shadow-md">
                    <h3 className="text-md font-semibold mb-2">Detalles</h3>

                    <div className="avatar items-center gap-4 my-2 py-2">
                      <div className="w-10 rounded-full">
                        <img src={user.photoURL} />
                      </div>
                      <p className="text-xs font-bold">{user.displayName}</p>
                    </div>
                    <textarea
                      className="shadow-md w-full"
                      placeholder="Ingresa una descripción"
                      value={description}
                      onChange={handleDescriptionChange}
                    ></textarea>
                    <button
                      onClick={handleUpload}
                      className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg absolute bottom-0 right-10 bottom-10"
                    >
                      Subir
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
      <ToastContainer />;
    </>
  );
}

export default ModalNewPost;
