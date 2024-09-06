import { BrowserRouter, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ForYou from "./pages/ForYou";
import useAuthStore from "./store/storeAuth";
import { useEffect } from "react";
import { auth } from "./firebase";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";

function AppContent() {
  const { user, setUser } = useAuthStore();
  const location = useLocation(); // Hook para obtener la ubicación actual

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/" />;
  };

  return (
    <>
      {location.pathname !== "/signin" && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/foryou"
          element={<ProtectedRoute element={<ForYou />} />}
        />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
