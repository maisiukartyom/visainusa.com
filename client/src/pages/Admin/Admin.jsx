import axios from "../../api/axios";
import SupportAdmin from "../../components/SupportAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Admin = () => {

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
              navigate("/login")
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

export default Admin
