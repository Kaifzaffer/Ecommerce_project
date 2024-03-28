import React from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ProductDetail = () => {
  const params = useParams();
  const [product, setProduct] = useState(null);
  

  useEffect(() => {
    // console.log(params);

    if (params?.slug){
      
      getProduct(params.slug);
    }

  }, []);

  const getProduct = async (id) => {
    // console.log(params.slug);
    try {
      const { data } =
        id &&
        (await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/get-product/${id}`
        ));
      console.log(data);
      setProduct(data?.product);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(product);
  return (
    <Layout>
      <h1>Product Detail</h1>
      <div className="row container d-flex justify-content-center">
        <div className="col-md-6">
          {product && (
            <img
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/api/v1/product/product-photo/${product._id}`}
              alt={product?.title}
              height={"300"}
              className="card-img-top"
            />
          )}
        </div>
        <div className="col-md-6">
          <h4>{product?.title}</h4>

          <p>{product?.description}</p>
          <p>{product?.price}</p>
          <button className="btn btn-secondary">Add to cart</button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
