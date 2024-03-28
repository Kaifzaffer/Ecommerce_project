import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal } from "antd";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

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
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/create-category`,
        { name }
      );
      console.log(data);
      if (data?.success) {
        toast.success(`${data.category.name}`);
        getCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in submitting category");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      console.log(selected._id);
      const { data } = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/category/update-category/${
          selected._id
        }`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${data.message}`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getCategory();
      } else {
        toast.error(data.message);
        setVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/v1/category/delete-category/${id}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container fluid p-3 w-75">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1>Manage Category</h1>
        <div className="p-3">
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>
                  <button
                    className="btn btn-primary ms-2"
                    onClick={() => {
                      setVisible(true);
                      setUpdatedName(c.name);
                      setSelected(c);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger ms-2"
                    onClick={() => handleDelete(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          visible={visible}
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
          footer={null}
        >
          <CategoryForm
            value={updatedName}
            setValue={setUpdatedName}
            handleSubmit={handleUpdate}
          />
        </Modal>
      </div>
    </Layout>
  );
};

export default CreateCategory;
