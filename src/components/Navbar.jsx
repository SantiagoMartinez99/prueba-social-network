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
    <div className="navbar animated-background bg-gradient-to-r from-indigo-400 to-cyan-400 absolute top-0">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
        <a className="btn btn-ghost text-xl text-white">PhotoU</a>
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
          <button onClick={handleLogin}>Iniciar sesión con Google</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
