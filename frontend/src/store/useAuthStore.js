import { create } from "zustand";
import { auth } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  getIdToken,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set, get) => ({
  user: null,
  loading: false,
  error: null,
  token: null,

  // Registrar usuario
  register: async (email, password, name) => {
    set({ loading: true, error: null });
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await res.user.updateProfile({ displayName: name });
      const token = await getIdToken(res.user);
      set({ user: res.user, token, loading: false });
      return res.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // Login email/password
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const token = await getIdToken(res.user);
      set({ user: res.user, token, loading: false });
      return res.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // Login con Google
  loginWithGoogle: async () => {
    set({ loading: true, error: null });
    try {
      const res = await signInWithPopup(auth, provider);
      console.log("Usuario de goole: ",res.user)
      const token = await getIdToken(res.user);
      set({ user: res.user, token, loading: false });
      return res.user;
    } catch (error) {
      set({ error: error.message, loading: false });
      return null;
    }
  },

  // Logout
  logout: async () => {
    await signOut(auth);
    set({ user: null, token: null });
  },

  // Escuchar cambios de sesión
  listen: () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdToken(user);
        set({ user, token });
      } else {
        set({ user: null, token: null });
      }
    });
  },
}));

export default useAuthStore;
