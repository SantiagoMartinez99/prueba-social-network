import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthStore from "../store/storeAuth";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const { registerWithEmail, loginWithEmail } = useAuthStore();

  const handleAuth = async () => {
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
      toast.error("Error al procesar la solicitud. Verifica tus credenciales.");
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-indigo-400 to-cyan-400">
      <div className="bg-white rounded-lg shadow-lg max-w-md mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </h2>
        {isRegistering && (
          <>
            <input
              type="text"
              placeholder="Nombre completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4 w-full p-2 border border-gray-300 rounded"
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
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-6 w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={handleAuth}
          className="w-full font-bold text-white bg-gradient-to-r from-indigo-400 to-cyan-400 px-4 py-2 rounded-lg"
        >
          {isRegistering ? "Registrarse" : "Iniciar sesión"}
        </button>
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
                className="text-blue-500 underline font-bold"
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
