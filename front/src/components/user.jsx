import { useContext, useEffect } from "react"
import { UserContext } from "./context"
import Person2Icon from '@mui/icons-material/Person2';
import { useNavigate } from "react-router-dom";

export default function User(){

    const {user,setUser} = useContext(UserContext)
    let navigate = useNavigate()
    
    function handleclick (){
      setUser(false)
      localStorage.removeItem("token");
    }
    useEffect(()=>{
       if(!user){
        navigate("/")
       }
      
    },[user])

    return (
     user ? 
        <div className="w-full h-screen pt-20 ">
        
          <div className="flex flex-row gap-2  text-8xl items-center p-5 bg-gray-900 rounded-full text-white w-max px-20 m-5">
            <Person2Icon fontSize=""></Person2Icon>
             <h2 className="text-5xl text-bold">{user.username}</h2>
          </div>
          <div className="p-5 flex flex-col items-center font-bold text-xl text-gray-900">
            <p>Contact</p>
            <p>email : {user.email}</p>
            <p>phone : {user.phone}</p>
          </div>

          <div className="p-5 flex flex-col items-center font-bold text-xl text-gray-900">
            <p>Address</p>
            <p>City : {user.address.city}</p>
            <p>street : {user.address.street}</p>
            <p>Number : {user.address.number}</p>
          </div>

          <div className="w-full flex items-center justify-center p-5">
            <button onClick={handleclick} className="bg-red-800/40 rounded-lg px-10 py-3 text-red-900 font-bold hover:bg-800/60 outline-red-400 hover:outline-2">Close sesion</button>
          </div> 

    </div> : <div>Cargando....</div>)
}