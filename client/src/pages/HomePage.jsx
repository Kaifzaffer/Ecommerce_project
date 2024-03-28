import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth.jsx";
import { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Checkbox } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart.jsx";

const HomePage = () => {
  const { auth, setAuth } = useAuth();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [checked, setChecked] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [ cart, setCart ]= useCart();

  const getProducts = async () => {
    try {
      // setLoading(true);
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/get-product`
      );

      if (data?.success) {
        // setLoading(false);
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/product-count`
      );
      if (data?.success) {
        setTotal(data?.total);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategory(data.categories);
      }
      // console.log(data);
    } catch (error) {
      console.log(error);
      // toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getCategory();
    getTotal();
  }, []);

  const handleFilter = (value, id) => {
    let all = [...checked];

    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  useEffect(() => {
    if (!checked.length) {
      getProducts();
      // setPage(1);
    }
  }, [checked.length]);

  useEffect(() => {
    if (checked.length) {
      filterProducts();
    }
  }, [checked]);

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/products-filter`,
        { checked }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="main">
        <div className="category">
          <h5 className="text-center">Filter By Category</h5>
          {category?.map((c) => (
            <Checkbox
              key={c._id}
              value={c._id}
              onChange={(e) => handleFilter(e.target.checked, c._id)}
              name={c.name}
              className="m-2"
            >
              {c.name}
            </Checkbox>
          ))}
        </div>

        <div className="products">
          <h2 className="text-center">All Products</h2>
          <div className="product-rows">
            {products?.map((p) => (
              <div className="product-item" key={p._id}>
                <img
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/api/v1/product/product-photo/${p._id}`}
                  alt={p.name}
                />
                <h5>{p.name}</h5>
                <p>{p.description}</p>
                <h5>${p.price}</h5>
                <button
                  className="btn btn-primary m-1"
                  onClick={() => {setCart([...cart, p])
                   toast.success("Item added to cart")
                  }}
                >
                  Add to Cart
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
