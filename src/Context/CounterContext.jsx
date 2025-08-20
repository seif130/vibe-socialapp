import { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider(props) {
    const [userlogin, setuserlogin] = useState(localStorage.getItem('usertoken'));

    // useEffect(()=>{
    //     if(localStorage.getItem('usertoken')){
    //         setuserlogin(localStorage.getItem('usertoken'))
    //     }
    // })

    return (
        <UserContext.Provider value={{ userlogin, setuserlogin }}>
            {props.children}
        </UserContext.Provider>
    );
}
