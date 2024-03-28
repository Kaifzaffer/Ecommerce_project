import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Products.css";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/get-product`
      );
      setProducts(data.products);
      console.log(data);
      if (data?.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting products");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">Products</h1>
            {products && products.length > 0 ? (
              <div className="product-grid row">
                {products.map((p) => (
                    
                  <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id}>
                
                    <div
                      className="product-card"
                      key={p._id}
                    >
                      <img
                        src={`${import.meta.env.VITE_BACKEND_URL}/api/v1/product/product-photo/${p._id}`}
                        className="card-img-top"
                        alt={p.title}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">{p.description}</p>
                      </div>
                    </div>
                  </Link>
                  
                ))}
              </div>
            ) : (
              <p>No products available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
