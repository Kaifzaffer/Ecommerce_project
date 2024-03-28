import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios"; 
import Spinner from "../Spinner";


export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const { auth } = useAuth();

  useEffect(() => {
   
    const fetchAuth = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/user-auth`,
            {
                headers: {
                    "Authorization" : auth?.token
                }
            }

        )
        if(res.data.ok) setOk(true);
        else setOk(false);
    }
     
        if(auth?.token) fetchAuth();
        

  }, [auth?.token]);
  return ok ? <Outlet /> :  <Spinner/>
}
