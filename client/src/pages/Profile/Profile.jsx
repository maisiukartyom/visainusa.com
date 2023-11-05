import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SupportEngine from "../../components/SupportEngine";
import axios from "../../api/axios";

const Profile = () => {

    const [user, setUser] = useState({});
    const [verified, setVerified] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const verifyCookie = async (level) => {
            try{
                const user = await axios.post("auth/verify",
                    {
                        requiredLevel: level,
                    },
                    {
                        withCredentials: true
                    }
                )
                setUser({email: user.data.email, 
                    level: user.data.level, 
                    name: user.data.fullname, 
                    isAdmin: user.data.isAdmin})
                setVerified(true)
            }
            catch (err){
              navigate("/login")
            }
          }
          verifyCookie(0, false)
    }, [])

    return (
        verified &&
        <div>
            Hello, {user.email}!
            <SupportEngine user={user}/>
        </div>
    )
}

export default Profile