import { useNavigate } from "react-router-dom";
import { useContext, useState , useEffect } from "react";
import { UserContext } from "./context";
import validateUserData from "../schemas/user";
import { Create_user , validar_token } from "../get_prod";

export default function Register() {
    const [error, setError] = useState(false);
    const [errorMessages, setErrorMessages] = useState({});
    const {user,setUser} = useContext(UserContext)

    useEffect(() => {
        
        const checkToken = async () => {
            const storedToken = localStorage.getItem("token");
    
            if (storedToken) {
                const initialUser = await validar_token(storedToken);
              
                setUser(initialUser.data);
                navigate("/products");
            }
        };
    
        checkToken(); 
    }, []);

    
    let navigate = useNavigate();

    const handleClick = async () => {
        const email = document.getElementById("email").value;
        const user = document.getElementById("user").value;
        const pass = document.getElementById("pass").value;
        const first = document.getElementById("first").value;
        const last = document.getElementById("last").value;
        const phone = document.getElementById("phone").value;

        // Crear el objeto JSON
        const userData = {
            email,
            username: user,
            password: pass,
            firstname: first,
            lastname: last,
            phone
        };

        const validateInfo = validateUserData(userData);
        
        if (!validateInfo.success) {
            // Si la validación falla, actualizar el estado con los errores
            const messages = {};
            validateInfo.errors.forEach(error => {
                messages[error.path[0]] = error.message; // Asignar el mensaje al campo correspondiente
            });
            setErrorMessages(messages); // Guardar los mensajes de error
            setError(true); // Establecer error
            return;
        }

        // Si la validación pasa, limpiar errores
        setError(false);
        setErrorMessages({});

        const token = await Create_user(userData);

        if (!token.success) {
            console.log(token.Error)
            setError(true);
            return;
        }

        setError(false);
        localStorage.setItem("token", token.token);
        const u = await validar_token(token.token);
        setUser(u.data);
        navigate("/products");
    };

    return (
        <div className="w-1/2 bg-gray-800 h-max rounded-lg text-white flex flex-col gap-3 items-center justify-center py-20 px-5">
            <h3 className="text-xl font-bold">Register</h3>
            <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                <input
                    id="email"
                    className="p-3 focus:outline-none border-b-3 border-white w-8/10"
                    type="text"
                    placeholder="Email"
                />
                {errorMessages.email && (
                    <p className="text-red-500 text-sm">{errorMessages.email}</p>
                )}

                <input
                    id="user"
                    className="p-3 focus:outline-none border-b-3 border-white w-8/10"
                    type="text"
                    placeholder="Username"
                />
                {errorMessages.username && (
                    <p className="text-red-500 text-sm">{errorMessages.username}</p>
                )}

                <input
                    id="pass"
                    className="p-3 focus:outline-none border-b-3 border-white w-8/10"
                    type="password"
                    placeholder="Password"
                />
                {errorMessages.password && (
                    <p className="text-red-500 text-sm">{errorMessages.password}</p>
                )}

                <input
                    id="first"
                    className="p-3 focus:outline-none border-b-3 border-white w-8/10"
                    type="text"
                    placeholder="First Name"
                />
                {errorMessages.firstname && (
                    <p className="text-red-500 text-sm">{errorMessages.firstname}</p>
                )}

                <input
                    id="last"
                    className="p-3 focus:outline-none border-b-3 border-white w-8/10"
                    type="text"
                    placeholder="Last Name"
                />
                {errorMessages.lastname && (
                    <p className="text-red-500 text-sm">{errorMessages.lastname}</p>
                )}

                <input
                    id="phone"
                    className="p-3 focus:outline-none border-b-3 border-white w-8/10"
                    type="text"
                    placeholder="Phone"
                />
                {errorMessages.phone && (
                    <p className="text-red-500 text-sm">{errorMessages.phone}</p>
                )}

                <input
                    className="px-5 py-3 bg-gray-700 rounded-lg w-1/3"
                    type="submit"
                    value="Enviar"
                    onClick={handleClick}
                />

                <p className="text-gray-300">
                    Already have an account?{" "}
                    <span
                        onClick={() => {
                            navigate("/");
                        }}
                        className="text-blue-400 hover:text-blue-600 cursor-pointer"
                    >
                        Log in
                    </span>
                </p>
            </div>
        </div>
    );
}
