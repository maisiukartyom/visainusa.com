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
                const res = await axios.post("auth/verify",
                    {
                        requiredLevel: level,
                    },
                    {
                        withCredentials: true
                    }
                )
                setUser({email: res.data.email, 
                    level: res.data.level, 
                    name: res.data.name, 
                    isAdmin: res.data.isAdmin})
                setVerified(true)
                if (res.data.isAdmin){
                    navigate("/admin")
                }
            }
            catch (err){
              navigate("/login")
            }
          }
          verifyCookie(0, false)
    }, [])

    return (
        verified &&
        <>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h1>Hello, {user.name}!</h1>
                    <h2>{user.email}</h2>
                    <h3><strong>Level: {user.level}</strong></h3>
                    <button onClick={() => navigate("/")}>HOME</button>
                </div>
                <div style={styles.card}>
                    {/* {user.level >= 1 &&
                        <button onClick={() => navigate("/levelone")}>Level 1</button>
                    } */}
                    <button onClick={() => navigate("/levelone")}>Level 1</button>
                        {user.level >= 2 &&
                        <button onClick={() => navigate("/leveltwo")}>Level 2</button>
                    }
                        {user.level >= 3 &&
                        <button onClick={() => navigate("/levelthree")}>Level 3</button>
                    }
                </div>
            </div>
              <SupportEngine user={user} />
        </>

    )
}

const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      gap: "10px"
    },
    card: {
      background: "#ffffff",
      padding: "20px",
      borderRadius: "8px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
      textAlign: "center",
    },
  };

export default Profile