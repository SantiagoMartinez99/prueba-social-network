import { create }  from "zustand";
import { auth, provider, signInWithPopup, signOut } from "../firebase";

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

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
