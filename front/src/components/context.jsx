import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState();
    const [categoria,setCategoria] = useState("all")
    const [search,setSearch] = useState("")
   

    return (
        <UserContext.Provider value={{ user, setUser ,categoria ,setCategoria , search , setSearch}}>
            {children}
        </UserContext.Provider>
    );
}
