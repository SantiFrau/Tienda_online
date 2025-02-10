import { useEffect,useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { get_categories } from "../get_prod";

export default function Nav({categoria , setCategoria}){

    const [categorias, setCategorias] = useState([]);

    async function get(){
        const categorias = await get_categories();
        categorias.unshift("all");
        setCategorias(categorias);
    }

    useEffect(()=>{
        get()
    },[])

    return (
        <nav className="w-full bg-gray-800 fixed p-2 top-0 left-0 flex flex-row justify-between items-center">
          <div className="w-1/3 p-2">
            <select
              className="p-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white focus:bg-gray-900"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <input
            className=" w-1/3 border-b-2 border-l-2 rounded-lg border-gray-300 focus:outline-none text-white p-2"
            type="text"
            placeholder="Buscar producto"
          />
          <div className="w-1/3 flex justify-end items-center p-2">
            <div className="bg-white rounded-full p-2 hover:bg-gray-200 hover:outline-2 outline-gray-500 transition-all">
              <ShoppingCartIcon />
            </div>
          </div>
        </nav>
    )
}