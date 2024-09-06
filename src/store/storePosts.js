import { create } from "zustand";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDocs,
  collection,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import { dataURLToBlob } from "../utils";
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

const useCreatePostStore = create((set, get) => ({
  selectedImage: null,
  description: "",
  isFilterOpen: false,
  setSelectedImage: (image) => set({ selectedImage: image }),
  setDescription: (description) => set({ description }),
  setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),

  handleImageChange: (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Imagen seleccionada:", reader.result);
        set({ selectedImage: reader.result, isFilterOpen: true });
      };
      reader.readAsDataURL(file);
    }
  },

  uploadImageToFirestore: async () => {
    const { user } = useAuthStore.getState();
    const { selectedImage, description } = get();

    if (!selectedImage) {
      toast.error("No hay imagen seleccionada");
      return;
    }

    try {
      const blob = dataURLToBlob(selectedImage);
      const file = new File([blob], "uploaded_image.jpg", { type: blob.type });
      const uniqueFileName = `${user.uid}-${uuidv4()}`;
      const storageRef = ref(storage, `uploads/${user.uid}/${uniqueFileName}`);

      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "posts"), {
        userId: user.uid,
        userName: user.displayName,
        userPhotoURL: user.photoURL,
        imageURL: downloadURL,
        description: description || "",
        likes: 0,
        comments: [],
        uploadedAt: new Date(),
      });

      set({ selectedImage: null, description: "" });
      toast.success("Post creado con éxito");
    } catch (error) {
      toast.error("Error al crear el post");
      console.error("Error uploading image:", error);
    }
  },

  handleUploadClick: () => {
    get().uploadImageToFirestore();
  },
}));

export default { usePostStore, useCreatePostStore };
