import { useState ,useEffect} from "react";
import { useContext } from "react";
import { UserContext } from "./context";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person2Icon from '@mui/icons-material/Person2';
import { Outlet } from "react-router-dom";
import Footer from "./footer";
import { get_categories } from "../get_prod";

export default function Layout() {

  const [categorias, setCategorias] = useState([]);
  const { user ,categoria ,setCategoria } = useContext(UserContext);

  async function get(){
      const categorias = await get_categories();
      categorias.unshift("all");
      setCategorias(categorias);
  }

  useEffect(() => {
      get();
  }, []);

  return (
      <>
          <nav className="z-10 w-3/4 bg-gray-800 fixed p-2 top-0 right-0 flex flex-row justify-between items-center">
              <input
                  className="w-1/3 border-b-2 border-l-2 rounded-lg border-gray-300 focus:outline-none text-white p-2"
                  type="text"
                  placeholder="Buscar producto"
              />
              <div className="w-1/3 flex justify-end items-center p-2">
                  <div className="bg-white rounded-full p-2 hover:bg-gray-200 hover:outline-2 outline-gray-500 transition-all">
                      <ShoppingCartIcon />
                  </div>
              </div>
          </nav>

          <aside className="flex flex-row w-full h-max relative">
              <div className="w-1/4 h-screen fixed bg-gray-800 top-0 left-0 flex flex-col items-center justify-between pb-10 pt-5">
                  <h1 className="text-white font-bold text-4xl">Tienda Online</h1>

                  <div className="flex flex-row items-center justify-center gap-5">
                      <h3 className="text-white font-bold text-xl">Filtros:</h3>
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

                  <div className="text-white w-full mt-50 flex flex-row gap-3 items-center justify-center">
                      <Person2Icon fontSize="large" />
                      {/* Solo mostramos el username si 'user' no es undefined */}
                      <p className="text-bold text-2xl">{user ? user.username : "Cargando..."}</p>
                  </div>
              </div>
              <div className="w-1/4 h-screen"></div>

              <div className="w-3/4 h-max flex flex-col">
                  <Outlet />
                  <Footer />
              </div>
          </aside>
      </>
  );
}
