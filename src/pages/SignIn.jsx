import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Asegúrate de importar toast aquí
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/storeAuth";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();
  const { loginWithGoogle, registerWithEmail, loginWithEmail } = useAuthStore();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!email || !password || (isRegistering && !name)) {
      toast.error("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      if (isRegistering) {
        await registerWithEmail(email, password, name, image);
        toast.success("Registro exitoso. Ahora puedes iniciar sesión.");
        setIsRegistering(false);
      } else {
        await loginWithEmail(email, password);
        toast.success("Inicio de sesión exitoso");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error en el proceso de autenticación:", error);
      toast.error("Error al procesar la solicitud. Verifica tus credenciales.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/foryou");
    } catch (error) {
      toast.error("Error durante el inicio de sesión con Google.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-indigo-400 to-cyan-400">
      <div className="relative bg-white rounded-lg shadow-lg max-w-md mx-auto p-6">
        <Link to="/">
          <ArrowLeftCircleIcon className="absolute top-4 left-4 h-10 w-10 text-gray-800 hover:text-gray-600 transition-colors duration-300" />
        </Link>
        <h2 className="text-2xl font-semibold my-6 text-center">
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </h2>
        <form onSubmit={handleAuth}>
          {isRegistering && (
            <>
              <input
                type="text"
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mb-4 w-full p-2 border border-gray-300 rounded"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 w-full p-2 border border-gray-300 rounded"
              />
            </>
          )}
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full p-2 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full p-2 border border-gray-300 rounded"
            required
          />
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              className="w-full font-bold text-white bg-gradient-to-r from-indigo-400 to-cyan-400 px-4 py-2 rounded-lg"
            >
              {isRegistering ? "Registrarse" : "Iniciar sesión"}
            </button>
            <button
              type="button"
              className="w-full font-bold text-white bg-gradient-to-r from-indigo-400 to-cyan-400 px-4 py-2 rounded-lg"
              onClick={handleLogin}
            >
              Iniciar sesión con Google
            </button>
          </div>
        </form>
        <p className="mt-4 text-center">
          {isRegistering ? (
            <>
              ¿Ya tienes una cuenta?{" "}
              <button
                onClick={() => setIsRegistering(false)}
                className="text-blue-500 underline font-bold"
              >
                Inicia sesión aquí
              </button>
            </>
          ) : (
            <>
              ¿No tienes una cuenta?{" "}
              <button
                onClick={() => setIsRegistering(true)}
                className="text-indigo-400 underline font-bold"
              >
                Regístrate aquí
              </button>
            </>
          )}
        </p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SignIn;
