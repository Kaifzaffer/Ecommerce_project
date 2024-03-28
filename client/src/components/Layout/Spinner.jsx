import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = () => {
  const [count, setCount] = useState(1);
  const location = useLocation();

  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);

    }, 1000);
    count === 0 && navigate("/login", { state: { from: location } });
    return () => clearInterval(interval);
    
  }, [count, navigate, location]); 

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1>Redirecting to login in {count} seconds...</h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;
