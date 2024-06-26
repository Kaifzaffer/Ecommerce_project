import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth.jsx";
import "./AdminDashboard.css";
export default function AdminDashboard() {
  const { auth } = useAuth();

  return (
    <Layout>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-4">
              <h4>User_Name: {auth?.user?.name}</h4>
              <h4>User_email: {auth?.user?.email}</h4>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
