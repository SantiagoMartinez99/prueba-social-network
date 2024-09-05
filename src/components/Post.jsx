import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

function PostsList() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsArray);
    };

    fetchPosts();
  }, []);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(123);
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

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
              <div className="flex gap-4">
                <button
                  className="btn btn-ghost btn-square btn-sm group"
                  onClick={handleLike}
                  aria-label={isLiked ? "Quitar me gusta" : "Me gusta"}
                >
                  {isLiked ? (
                    <HeartSolid className="h-6 w-6 text-red-500 transform group-active:scale-125 transition-transform duration-200" />
                  ) : (
                    <HeartOutline className="h-6 w-6 group-hover:text-red-500 transform group-active:scale-125 transition-transform duration-200" />
                  )}
                </button>
              </div>
              <p className="font-semibold ">{post.likes} Me gusta</p>
            </div>
            <div className="text-sm space-y-1">
              <span className="font-semibold">{post.userName}:</span>
              {post.description}
              <h4 className="text-gray-600 text-sm ">Comentarios</h4>
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
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Escribe un comentario..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="input input-bordered w-full mb-4 h-9"
                />
                <button
                  onClick={() => handleAddComment(post.id)}
                  className="btn btn-primary btn-sm text-sm font-bold text-white bg-gradient-to-r from-indigo-400 to-cyan-400 border-none"
                >
                  Comentar
                </button>
              </div>
            </div>

            <div className="comments-section"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsList;
