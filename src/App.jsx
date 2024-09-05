import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ForYou from "./pages/ForYou";
import useAuthStore from "./store/storeAuth";
import { useEffect } from "react";
import { auth } from "./firebase";

function App() {
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [setUser]);

  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/foryou" />;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/foryou"
          element={<ProtectedRoute element={<ForYou />} />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
