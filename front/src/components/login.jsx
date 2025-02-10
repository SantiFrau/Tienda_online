export default function Login(){

    return (
        <div className="w-1/2 bg-gray-800 h-max rounded-lg text-white flex flex-col gap-3 items-center justify-center py-20 px-5">
             
             <h3 className="text-xl font-bold">Inicio de sesion</h3>
             <form className="w-full h-full flex flex-col gap-3 items-center justify-center" action="">
                <input className="p-3 focus:outline-none  border-b-3 border-white w-8/10" type="text" placeholder="Usuario" />
                <input className="p-3 focus:outline-none  border-b-3 border-white w-8/10" type="password" placeholder="Contraseña" />

                <input className="px-5 py-3 bg-gray-700 rounded-lg w-1/3" type="submit" value={"Enviar"} />
             </form>

        </div>
    )
}