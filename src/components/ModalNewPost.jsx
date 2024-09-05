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

const dataURLToBlob = (dataURL) => {
  const [header, data] = dataURL.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(data);
  let array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], { type: mime });
};

function ModalNewPost({ isOpen, setIsOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { user } = useAuthStore();
  const [description, setDescription] = useState(""); // Nueva variable para la descripción

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setIsFilterOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToFirestore = async (
    file,
    userId,
    userName,
    userPhotoURL,
    description
  ) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    if (!file.name) {
      console.error("File name is undefined");
      return;
    }

    try {
      const uniqueFileName = `${userId}-${uuidv4()}`;
      const storageRef = ref(storage, `uploads/${userId}/${uniqueFileName}`);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "posts"), {
        userId: userId,
        userName: userName,
        userPhotoURL: userPhotoURL,
        imageURL: downloadURL,
        description: description || "",
        likes: 0,
        comments: [],
        uploadedAt: new Date(),
      });

      setIsOpen(false);
      toast.success("Post creado con éxito");
    } catch (error) {
      toast.error("Error al crear el post");
    }
  };
  const handleUploadClick = () => {
    if (selectedImage) {
      const blob = dataURLToBlob(selectedImage);
      const file = new File([blob], "uploaded_image.jpg", { type: blob.type });
      uploadImageToFirestore(
        file,
        user.uid,
        user.displayName,
        user.photoURL,
        "Tu descripción aquí"
      );
    }
  };

  return (
    <>
      {isOpen ? (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg max-w-xl mx-auto p-6 relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setIsOpen(false)}
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
                    ></textarea>
                    <button
                      onClick={handleUploadClick}
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
