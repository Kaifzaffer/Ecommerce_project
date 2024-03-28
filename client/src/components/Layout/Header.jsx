import { NavLink, Link } from "react-router-dom";
import { FaBagShopping } from "react-icons/fa6";
import "./Header.css";
import { useAuth } from "../../context/auth.jsx";
import useCategory from "../../hooks/useCategory";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "../../context/cart";


function Header() {
  // Retrieve authentication state and function to set authentication state
  const { auth, setAuth } = useAuth();
  const { categories } = useCategory();
  const [cart]  = useCart();

  // Function to handle user logout
  const handleLogout = () => {
    // Clear authentication data
    setAuth({
      ...auth,
      data: null,
      user: null,
      token: null,
    });
    // Remove authentication data from localStorage
    localStorage.removeItem("auth");
    // Show toast notification for successful logout
    toast.success("Logout successful");
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Logo and Brand */}
          <Link to="/" className="navbar-brand">
            <FaBagShopping /> LILTUB
          </Link>
          {/* Navbar Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* Home Link */}
              <li className="nav-item">
                <NavLink to="/" className="nav-link active" aria-current="page">
                  Home
                </NavLink>
              </li>

              {!auth.user ? (
                <>
                  {/* Register Link */}
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li>
                  {/* Login Link */}
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.isAdmin == true ? "admin" : "user"
                          } `}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="nav-link"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
              {/* Cart Link */}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link">
                  Cart{cart?.length > 0 ? `(${cart.length})` : ""}
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Toast Container for notifications */}
      <ToastContainer />
    </>
  );
}

export default Header;
