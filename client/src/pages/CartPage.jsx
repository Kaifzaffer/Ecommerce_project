import Layout from "../components/Layout/Layout"; // Assuming Layout component
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth"; // Assuming useAuth is defined in authContext.js
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./cartPage.css";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const { auth } = useAuth();

  const navigate = useNavigate();

  console.log(auth);

  // ... your existing code

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">
              {auth?.user?.name ? `Hello ${auth?.user.name}` : "Hello User"}
            </h1>
            <h4>Total Cart: {cart?.length}</h4>
          </div>
        </div>
        <div className="cart-items">
          {cart?.map((p) => (
            <div key={p._id} className="cart-item">
              <div className="row">
                <div className="col-md-3">
                  <img
                    src={`${
                      import.meta.env.VITE_BACKEND_URL
                    }/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                  />
                </div>
                <div className="col-md-9">
                  <p className="cart-item-name">{p.name}</p>
                  <p>Quantity: {p.quantity}</p>
                  <p className="cart-item-price">Price : ${p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setCart(cart.filter((c) => c._id !== p._id));
                      toast.success("Item removed from cart");
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>

            </div>
          ))}
          <div className="col-md-4">
            <div className="text-center">
              <h2>Total Price : ${cart?.reduce((acc, p) => acc + p.price, 0)}</h2>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/checkout")}
              >
                Checkout
              </button>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
