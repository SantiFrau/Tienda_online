import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context";
import { useNavigate } from "react-router";
import { validar_token } from "../get_prod";
import { login } from "../get_prod";

export default function Login() {
    const [error, setError] = useState(false);
    const {user,setUser} = useContext(UserContext)
    let navigate = useNavigate();

    useEffect(() => {
        
        const checkToken = async () => {
            const storedToken = localStorage.getItem("token");
    
            if (storedToken) {
                const initialUser = await validar_token(storedToken);

                if(initialUser.success){
                    setUser(initialUser.data);
                navigate("/products");
                }else{
                    localStorage.removeItem("token")
                    navigate("/")
                }
              
                
            }
        };
    
        checkToken(); 
    }, []);
    
   async function handleClick() {
        const email = document.getElementById("user").value;
        const password = document.getElementById("pass").value;
        
        const token = await login({email,password})
        
        if(token.Error){
            console.log(token.Error)
            setError(true)
            return
        }
        
        setError(false)
        localStorage.setItem("token",token.token)
        const u = await validar_token(token.token)
        setUser(u.data)
        navigate("/products")
    }


    return (
        <div className="w-1/2 bg-gray-800 h-max rounded-lg text-white flex flex-col gap-3 items-center justify-center py-20 px-5">
            <h3 className="text-xl font-bold">Inicio de sesión</h3>
            <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                <input id="user" className="p-3 focus:outline-none border-b-3 border-white w-8/10" type="text" placeholder="Usuario" />
                <input id="pass" className="p-3 focus:outline-none border-b-3 border-white w-8/10" type="password" placeholder="Contraseña" />
                <input className="px-5 py-3 bg-gray-700 rounded-lg w-1/3" type="submit" value="Enviar" onClick={handleClick} />
                <p className="text-gray-300">Don't have an account? <span onClick={()=>{navigate("/register")}} className="text-blue-400 hover:text-blue-600 cursor-pointer">Register</span> </p>
                {error && <p className="text-red-600">Usuario o contraseña inválidos</p>}
            </div>
        </div>
    );
}
