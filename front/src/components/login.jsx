import { useEffect, useState } from "react";
import { get_users } from "../get_prod";

export default function Login() {
    const [error, setError] = useState(false);
    const [usuarios, setUsuarios] = useState([]); // Guardamos los usuarios en el estado

    useEffect(() => {
        async function fetchUsers() {
            const data = await get_users();
            setUsuarios(data); // Actualizamos el estado con los usuarios obtenidos
            console.log(data)
        }
        fetchUsers();
    }, []);

    function handleClick() {
        const usuario = document.getElementById("user").value;
        const password = document.getElementById("pass").value;

        const user = usuarios.find(us => us.username === usuario);

        if (user && user.password === password) {
            console.log("Login exitoso");
            setError(false)
        } else {
            setError(true);
        }
    }

    return (
        <div className="w-1/2 bg-gray-800 h-max rounded-lg text-white flex flex-col gap-3 items-center justify-center py-20 px-5">
            <h3 className="text-xl font-bold">Inicio de sesión</h3>
            <div className="w-full h-full flex flex-col gap-3 items-center justify-center">
                <input id="user" className="p-3 focus:outline-none border-b-3 border-white w-8/10" type="text" placeholder="Usuario" />
                <input id="pass" className="p-3 focus:outline-none border-b-3 border-white w-8/10" type="password" placeholder="Contraseña" />
                <input className="px-5 py-3 bg-gray-700 rounded-lg w-1/3" type="submit" value="Enviar" onClick={handleClick} />
                {error && <p className="text-red-600">Usuario o contraseña inválidos</p>}
            </div>
        </div>
    );
}
