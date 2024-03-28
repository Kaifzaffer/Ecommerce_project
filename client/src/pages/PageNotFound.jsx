import { NavLink } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import "./PageNotFound.css";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="page-not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          The page you requested could not be found. It may have been moved or
          deleted, or you may have typed the URL incorrectly.
        </p>
        <NavLink to="/">Go to Home Page</NavLink>
      </div>
    </Layout>
  );
};

export default PageNotFound;
