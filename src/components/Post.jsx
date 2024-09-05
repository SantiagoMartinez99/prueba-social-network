import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext"; // Importamos el contexto de autenticación

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState(""); // Almacena el comentario actual
  const { user } = useAuth(); // Obtener el usuario autenticado

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id, // Incluimos el id del post para manejar los comentarios
        ...doc.data(),
      }));
      setPosts(postsArray);
    };

    fetchPosts();
  }, []);

  // Función para agregar un comentario
  const handleAddComment = async (postId) => {
    if (commentText.trim() === "") return;

    await updateDoc(doc(db, "posts", postId), {
      comments: arrayUnion({
        userId: user.uid,
        userName: user.displayName,
        comment: commentText,
        createdAt: new Date(),
      }),
    });

    // Limpiamos el texto del comentario
    setCommentText("");
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div
          key={index}
          className="card max-w-md mx-auto bg-base-100 shadow-xl my-40"
        >
          <div className="card-body p-4">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full">
                  <img
                    src={
                      post.userPhotoURL || "/placeholder.svg?height=40&width=40"
                    }
                    alt={post.userName}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  {post.userName || "usuario"}
                </p>
                <p className="text-xs text-base-content text-opacity-60">
                  Ciudad, País
                </p>
              </div>
            </div>
          </div>
          <figure className="px-0 pt-0">
            <img
              src={post.imageURL}
              alt="Imagen de la publicación"
              className="w-full h-auto"
            />
          </figure>
          <div className="card-body p-4 pt-2">
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-4">{/* Botones de interacción */}</div>
              <button className="btn btn-ghost btn-square btn-sm">
                {/* Botón de marcador */}
              </button>
            </div>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{post.likes} Me gusta</p>
              <p>
                <span className="font-semibold">{post.userName}</span>{" "}
                {post.description}
              </p>
            </div>

            {/* Sección de comentarios */}
            <div className="comments-section">
              <h4 className="font-semibold text-sm mt-4">Comentarios</h4>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment, idx) => (
                  <div key={idx} className="mt-2 text-sm">
                    <span className="font-semibold">{comment.userName}: </span>
                    <span>{comment.comment}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-500">
                  No hay comentarios todavía.
                </p>
              )}

              {/* Input para agregar nuevo comentario */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Escribe un comentario..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="input input-bordered w-full mb-2"
                />
                <button
                  onClick={() => handleAddComment(post.id)} // Llama a la función de agregar comentario
                  className="btn btn-primary btn-sm"
                >
                  Comentar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
