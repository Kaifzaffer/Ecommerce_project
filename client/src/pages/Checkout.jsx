import Layout from "../components/Layout/Layout"; // Assuming Layout component
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth"; // Assuming useAuth is defined in authContext.js
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Checkout.css";

const Checkout = () => {
  const [cart, setCart] = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = async () => {
 
    alert("Checkout successful! Thanks for shopping with us.");
    setCart([]); 
    navigate("/"); 
  };

  return (
    <Layout>
      <div className="container checkout-container">
        <div className="row">
          <div className="col-md-6">
            <h2>Billing Details</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Shipping Address</label>
                <textarea
                  className="form-control"
                  id="address"
                  rows="3"
                  placeholder="Enter your shipping address"
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <h2>Your Order</h2>
            {cart?.map((p) => (
              <div className="cart-item" key={p._id}>
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
                    <p>{p.name}</p>
                    <p>Quantity: {p.quantity}</p>
                    <p>Price: ${p.price}</p>
                  </div>
                </div>
              </div>
            ))}
            <p className="total-price">
              Total: $
              {cart?.reduce((acc, item) => acc + item.price * item.quantity, 0)}
            </p>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Place Order
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
