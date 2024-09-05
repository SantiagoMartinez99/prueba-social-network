import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate("/foryou");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="navbar animated-background bg-gradient-to-r from-indigo-400 to-cyan-400 absolute top-0 font-inter">
      <div className="navbar-start">
        <a className="btn btn-ghost text-3xl text-white">PhotoU</a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end gap-2 m-4 text-white">
        {user ? (
          <>
            <div className="relative">
              <div className="dropdown dropdown-end dropdown-hover">
                <label tabIndex="0">
                  <div className="avatar online hover:cursor-pointer">
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </div>
                </label>

                <ul
                  tabIndex="0"
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                >
                  <li>
                    <a>Perfil</a>
                  </li>
                  <li>
                    <a>Configuración</a>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              </div>
            </div>

            {/* <p>Hola, {user.displayName}</p> */}
          </>
        ) : (
          <button
            className="btn  bg-transparent shadow-none border-none text-2xl md:text-4xl font-bold hover:bg-pink-500  text-white"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
