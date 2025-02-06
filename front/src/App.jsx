import { useEffect, useState } from "react";
import { get_categories, get_prods } from "./get_prod";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function App() {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("all");
  const [categorias, setCategorias] = useState([]);
  const [prodSelected, setProdSelected] = useState(false);

  async function m() {
    const productos = await get_prods(31);
    const categorias = await get_categories();
    categorias.unshift("all");
    setCategorias(categorias);
    setProductos(productos);
  }

  useEffect(() => {
    m();
  }, []);


  useEffect(() => {
    // Controlar el scroll del body cuando el diálogo está abierto
    if (prodSelected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Limpiar cuando el componente se desmonta o cuando el estado cambia
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [prodSelected]);




  const productosFiltrados =
    categoria === "all"
      ? productos
      : productos.filter((prod) => prod.category.toLowerCase() === categoria.toLowerCase());

  return (
    <>
      <div className="w-full flex items-center justify-center flex-col ">

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

        {prodSelected ? (
          <div className="w-full h-screen fixed left-0 top-0 bg-black/75 flex items-center justify-center" onClick={() => { setProdSelected(false); }}>
            
            <div className="overflow-y-auto w-1/2 bg-white h-9/10 rounded-lg transition-all">
              
              <div className="w-full h-max flex flex-col items-center justify-center gap-10 py-10">
                
                <img className="w-1/3" src={prodSelected.image} alt="" />
                <h4 className="w-2/3 font-bold text-xl">{prodSelected.title}</h4>
                
                <div className="w-2/3">
                  <span className="font-bold">Description</span>
                  <p>{prodSelected.description}</p>
                </div>

                <div className="flex flex-row items-center justify-between px-10 w-full">
                  <div className="p-2 rounded-full bg-green-200">
                    <AddShoppingCartIcon className="text-green-800" fontSize="large" />
                  </div>
                  <p className="text-green-600 font-bold text-xl">${prodSelected.price}</p>
                </div>


              </div>
            </div>
          </div>
        ) : undefined}

      </div>
    </>
  );
}

export default App;

