import { useEffect, useState } from "react";

function ModalNewPost({ isOpen, setIsOpen }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return isOpen ? (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-gray-700 rounded-lg shadow-lg max-w-sm mx-auto p-6 relative ">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setIsOpen(close)}
          >
            &times;
          </button>

          <h2 className="text-lg font-semibold mb-4">Subir imagenes</h2>
          <p className="mb-4">Arrastra tus fotos aca</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            capture="environment"
            className="mb-4"
          />
          {selectedImage && (
            <div className="mb-4">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded-lg border border-gray-300"
              />
            </div>
          )}
        </div>
      </div>
    </>
  ) : null;
}

export default ModalNewPost;
