import { useEffect, useState } from "react";
import { get_prods } from "../get_prod";
import ProdSelected from "./selectProduct";
export default function Products({categoria}){

    const [productos, setProductos] = useState([]);
    const [prodSelected, setProdSelected] = useState(false);
   
    const productosFiltrados =
    categoria === "all"
      ? productos
      : productos.filter((prod) => prod.category.toLowerCase() === categoria.toLowerCase());

      async function get() {
        const productos = await get_prods(31);
        setProductos(productos);
      }

      useEffect(() => {
        get();
      }, []);
   
    return( <>
    
        {productosFiltrados ? (
        <div className="bg-gray-300 w-2/3 flex items-center justify-center gap-5 flex-wrap p-5 py-30">
          {productosFiltrados.map((prod) => {
            return (
              <div
                key={prod.id}
                onClick={() => { setProdSelected(prod); }}
                className="hover:scale-110 transition-all hover:border-2 border-gray-600 flex flex-col items-center justify-around gap-3 bg-white p-10 rounded-lg w-70 h-90"
              >
                <img className="w-2/3 max-h-2/3" src={prod.image} alt="" />
                <h4 className="w-2/3 truncate font-bold text-xl">{prod.title}</h4>
                <p className="text-green-600 font-bold">${prod.price}</p>
              </div>
            );
          })}
        </div>
      ) : undefined}

      <ProdSelected prodSelected={prodSelected} setProdSelected={setProdSelected}></ProdSelected>


      </>
  )
    
}