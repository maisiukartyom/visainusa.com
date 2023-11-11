import axios from "../../api/axios";
import SupportAdmin from "../../components/SupportAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

const AdminChat = () => {

    const [verified, setVerified] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const verifyCookie = async (level, forAdmin) => {
            try{
                const user = await axios.post("auth/verify",
                    {
                        requiredLevel: level,
                        forAdmin: forAdmin
                    },
                    {
                        withCredentials: true
                    }
                )
                // setUser({email: user.data.email, 
                //     level: user.data.level, 
                //     name: user.data.fullname, 
                //     isAdmin: user.data.isAdmin})
                setVerified(true)
            }
            catch (err){
                toast.error("You're not an admin!",{
                    position: "top-center",
                    autoClose: 6000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "light",
                    }
                  )
              navigate("/")
            }
          }
          verifyCookie(0, true)
    }, [])

    return (
        verified &&
        <>
            <SupportAdmin />
        </>
    )
}

export default AdminChat
