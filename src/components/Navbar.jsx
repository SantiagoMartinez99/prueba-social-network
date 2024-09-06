import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/storeAuth";
import { Link } from "react-router-dom";

function Navbar() {
  const { user, loginWithGoogle, logout } = useAuthStore();
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
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="navbar animated-background  fixed top-0 font-inter z-50 transition-transform duration-200 ease-in-out">
      <div className="navbar-start">
        <a
          className="btn btn-ghost text-3xl text-cyan-300 font-bold"
          onClick={() => navigate("/")}
        >
          PhotoU
        </a>
      </div>
      <div className="navbar-center hidden lg:flex"></div>
      <div className="navbar-end gap-2 m-4 text-white">
        {user ? (
          <>
            <div className="relative">
              <div className="dropdown dropdown-end dropdown-hover">
                <label tabIndex="0">
                  <div className="avatar online hover:cursor-pointer">
                    <div className="w-16 rounded-full">
                      <img src={user.photoURL} alt="User Avatar" />
                    </div>
                  </div>
                </label>
                <ul
                  tabIndex="0"
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 text-black"
                >
                  <li>
                    <Link to="/foryou">Para ti</Link>
                  </li>
                  <li>
                    <Link to="/profile">Perfil</Link>
                  </li>

                  <li>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <Link to="/signin">
            <button className="btn btn-primary bg-gradient-to-l from-indigo-400 to-cyan-400 text-white text-xl border-none">
              Iniciar Sesión
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
