
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
// import "./CreateProduct.css";

const { Option } = Select;

const UpdateProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [photo, setPhoto] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [id,setId] = useState("");


  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/get-product/${params.slug}`
      );
      if (data?.success) {
        setName(data.product.name);
        setDescription(data.product.description);
        setPrice(data.product.price);
        setPhoto(data.product.photo);
        setCategory(data.product.category._id);
        setShipping(data.product.shipping);
        setQuantity(data.product.quantity);
        setId(data.product._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting single product");
    }
  }

  useEffect(() => {
    getSingleProduct();
  },[])


  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      photo && productData.append("price", price);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);
      
    console.log(id);

      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/product/update-product/${id}`,
        productData
      );
      console.log(data);
      if (data?.success) {
        toast.success(`${data.product.name} is created`);
        // navigate("/dashboard/admin/products");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in creating product");
    }
  };

  return (
    <Layout>
      <div className="container fluid p-3 ">
        <AdminMenu />
      </div>
      <div className="col">
        <h1>Update Product</h1>
        <div className="m-1 w-75">
          <Select
            bordered={false}
            placeholder="Select Category"
            size="large"
            showSearch
            className="form-select mb-3"
            onChange={(value) => setCategory(value)}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
          <div className="mb-3">
            <label className="btn btn-primary ">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              placeholder="write a name"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <textarea
              type="text"
              value={description}
              placeholder="write a description"
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={price}
              placeholder="write a price"
              className="form-control"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Select
              bordered={false}
              placeholder="Select Shipping"
              size="large"
              showSearch
              className="form-select mb-3"
              onChange={(value) => setShipping(value)}
              value={shipping === "1" ? "1" : "0"}
            >
              <Option value="1">Yes</Option>
              <Option value="0">No</Option>
            </Select>
          </div>
          <div className="mb-3">
            <input
              type="number"
              value={quantity}
              placeholder="write a quantity"
              className="form-control"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProducts;

