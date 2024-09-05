import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db, storage } from "../firebase";
import ImageFilter from "./ImageFilter";

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
  const { user } = useAuth();

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

  const uploadImageToFirestore = async (file, userId) => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    // Verifica el nombre del archivo
    if (!file.name) {
      console.error("File name is undefined");
      return;
    }

    try {
      // Crear una referencia en Storage
      const storageRef = ref(storage, `uploads/${userId}/${file.name}`);
      console.log("Storage reference:", storageRef);

      // Subir el archivo a Storage
      const snapshot = await uploadBytes(storageRef, file);
      console.log("Uploaded a blob or file!", snapshot);

      // Obtener la URL de descarga
      const downloadURL = await getDownloadURL(storageRef);

      // Guardar la URL en Firestore
      const docRef = doc(db, "userUploads", userId); // Cambia "userUploads" por tu colección y "userId" por el identificador adecuado
      await setDoc(docRef, {
        imageURL: downloadURL,
        uploadedAt: new Date(),
      });

      console.log("File uploaded and URL saved to Firestore!");
    } catch (error) {
      console.error("Error uploading file or saving URL:", error);
    }
  };

  const handleUploadClick = () => {
    if (selectedImage) {
      const blob = dataURLToBlob(selectedImage);
      const file = new File([blob], "uploaded_image.jpg", { type: blob.type }); // Asegúrate de que el nombre del archivo esté definido
      uploadImageToFirestore(file, user.uid);
    }
  };

  return isOpen ? (
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
  ) : null;
}

export default ModalNewPost;
