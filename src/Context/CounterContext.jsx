import { createContext, useEffect, useState } from "react";
import{ jwtDecode} from "jwt-decode";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [userlogin, setuserlogin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setuserlogin({
          token,
          id: decoded.id, 
          name: decoded.name 
        });
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ userlogin, setuserlogin }}>
      {props.children}
    </UserContext.Provider>
  );
}
