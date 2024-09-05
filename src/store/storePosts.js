import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "../firebase";
import { create } from "zustand";
import useAuthStore from "./storeAuth";

const usePostStore = create((set, get) => ({
  posts: [],
  loading: false,
  commentText: "",

  setPosts: (posts) => set({ posts }),
  setLoading: (loading) => set({ loading }),
  setCommentText: (text) => set({ commentText: text }),

  fetchPosts: async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        likes: doc.data().likes || [],
        comments: doc.data().comments || [],
      }));
      set({ posts: postsArray });
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  },

  addLikeToPost: async (postId) => {
    try {
      const { user } = useAuthStore.getState();
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    } catch (error) {
      console.error("Error adding like:", error);
    }
  },

  removeLikeFromPost: async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } catch (error) {
      console.error("Error removing like:", error);
    }
  },

  handleLikeClick: async (postId, hasLiked) => {
    const { addLikeToPost, removeLikeFromPost, posts, setLoading } = get();
    const { user } = useAuthStore.getState();
    if (get().loading) return;

    setLoading(true);
    if (hasLiked) {
      await removeLikeFromPost(postId, user.uid);
      set({
        posts: posts.map((post) =>
          post.id === postId
            ? { ...post, likes: post.likes.filter((uid) => uid !== user.uid) }
            : post
        ),
      });
    } else {
      await addLikeToPost(postId, user.uid);
      set({
        posts: posts.map((post) =>
          post.id === postId
            ? { ...post, likes: [...post.likes, user.uid] }
            : post
        ),
      });
    }
    setLoading(false);
  },

  handleAddComment: async (postId) => {
    const { commentText, posts, setCommentText } = get();
    const { user } = useAuthStore.getState();
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
    set({
      posts: posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  userId: user.uid,
                  userName: user.displayName,
                  comment: commentText,
                  createdAt: new Date(),
                },
              ],
            }
          : post
      ),
    });
  },
}));

export default usePostStore;
