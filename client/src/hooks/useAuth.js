// import { useContext, useDebugValue } from "react";
// import AuthContext from "../context/AuthProvider";

// const useAuth = () => {
//     const { auth } = useContext(AuthContext);
//     useDebugValue(auth, auth => auth?.user ? "Logged In" : "Logged Out")
//     return useContext(AuthContext);
// }

// export default useAuth;

// useAuth.js
import { useDispatch, useSelector } from "react-redux";
import { setAuth, clearAuth } from "../authSlice";

const useAuth = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const setAuthentication = (authData) => {
    dispatch(setAuth(authData));
  };

  const clearAuthentication = () => {
    dispatch(clearAuth());
  };

  return { auth, setAuthentication, clearAuthentication };
};

export default useAuth;
