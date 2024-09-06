import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import useAuthStore from "../store/storeAuth";
import store from "../store/storePosts";

const { usePostStore } = store;

function Posts() {
  const {
    posts,
    handleLikeClick,
    handleAddComment,
    commentText,
    setCommentText,
    fetchPosts,
  } = usePostStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="my-40">
      {posts.map((post) => {
        const hasLiked =
          Array.isArray(post.likes) && post.likes.includes(user.uid);

        return (
          <div
            key={post.id}
            className="card max-w-md mx-auto bg-base-100 shadow-2xl my-10"
          >
            <div className="card-body p-4">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full">
                    <img
                      src={
                        post.userPhotoURL ||
                        "/placeholder.svg?height=40&width=40"
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
                    onClick={() => handleLikeClick(post.id, hasLiked)}
                    aria-label={hasLiked ? "Quitar me gusta" : "Me gusta"}
                  >
                    {hasLiked ? (
                      <HeartSolid className="h-6 w-6 text-red-500 transform group-active:scale-125 transition-transform duration-200" />
                    ) : (
                      <HeartOutline className="h-6 w-6 group-hover:text-red-500 transform group-active:scale-125 transition-transform duration-200" />
                    )}
                  </button>
                </div>
                <p className="font-semibold ">{post.likes.length} Me gusta</p>
              </div>
              <div className="text-sm space-y-1">
                <span className="font-semibold">{post.userName}:</span>
                {post.description}
                <h4 className="text-gray-600 text-sm ">Comentarios</h4>
                {post.comments && post.comments.length > 0 ? (
                  post.comments.map((comment, idx) => (
                    <div key={idx} className="mt-2 text-sm">
                      <span className="font-semibold">
                        {comment.userName}:{" "}
                      </span>
                      <span>{comment.comment}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-500">
                    No hay comentarios todavía.
                  </p>
                )}
                <div className="relative mt-4">
                  <input
                    type="text"
                    placeholder="Escribe un comentario..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className="input input-bordered w-full mb-4 h-9 pr-16"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="absolute right-0 top-0 h-9 px-4 text-sm font-bold text-white bg-gradient-to-r from-indigo-400 to-cyan-400 border-none rounded-r-md
                    hover:cursor-pointer"
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
