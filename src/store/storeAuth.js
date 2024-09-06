import { create } from "zustand";
import { auth, provider, signInWithPopup, signOut, storage } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const result = await signInWithPopup(auth, provider);
      set({ user: result.user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      await signOut(auth);
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  registerWithEmail: async (email, password, name, image) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      let imageUrl = "";
      if (image) {
        const imageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      await updateProfile(user, {
        displayName: name,
        photoURL: imageUrl,
      });

      set({ user, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  loginWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      set({ user: userCredential.user, loading: false });
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      toast.error("Error al procesar la solicitud. Verifica tus credenciales.");
      set({ error: error.message, loading: false });
    }
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
