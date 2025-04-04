import { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "./context";
import { Outlet, NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person2Icon from "@mui/icons-material/Person2";
import MenuIcon from "@mui/icons-material/Menu";
import InventoryIcon from "@mui/icons-material/Inventory";
import Footer from "./footer";
import { get_categories } from "../get_prod";
import SearchIcon from '@mui/icons-material/Search';

export default function Layout() {
    const [categorias, setCategorias] = useState([]);
    const { user, categoria, setCategoria, setSearch , cart } = useContext(UserContext);
    const [menu, setMenu] = useState(false);
    const searchInputRef = useRef();

    function handleclick() {
        const searchTerm = searchInputRef.current.value.trim();  
        setSearch(searchTerm);  
    }

    async function get() {
        const categorias = await get_categories();
        const nombresCategorias = categorias.map(categoria => categoria.name);  
        
        setCategorias(nombresCategorias);  
    }

    useEffect(() => {
        get();
    }, []);

    return (
        <>
            {/* Barra de navegación para pantallas grandes */}
            <nav className="z-10 lg:flex w-3/4 bg-gray-800 fixed p-2 top-0 right-0 hidden flex-row justify-around items-center py-4">
                <div className="relative w-1/3">
                    <input
                        ref={searchInputRef}
                        className="w-full border-b-2 border-l-2 rounded-lg border-gray-300 focus:outline-none text-white p-2 pl-3 pr-10"
                        type="text"
                        placeholder="Buscar producto"
                    />
                    <button
                        className="absolute right-0 top-0 bottom-0 px-3 py-2 hover:bg-gray-400/25 rounded-lg"
                        onClick={handleclick}
                    >
                        <SearchIcon className="text-white" />
                    </button>
                </div>
                        
            </nav>

            {/* Barra de navegación para pantallas pequeñas */}
            <nav className="z-10 flex w-full bg-gray-800 fixed p-2 top-0 right-0 lg:hidden flex-row justify-between items-center">
                <h1 className="text-white font-bold text-2xl w-1/3">Tienda Online</h1>
                <div className="relative w-2/4">
                    <input
                        ref={searchInputRef}
                        className="w-full border-b-2 border-l-2 rounded-lg border-gray-300 focus:outline-none text-white p-2 pl-3 pr-10"
                        type="text"
                        placeholder="Buscar producto"
                    />
                    <button
                        className="absolute right-0 top-0 bottom-0 px-3 py-2 hover:bg-gray-400/25 rounded-lg"
                        onClick={handleclick}
                    >
                        <SearchIcon className="text-white" />
                    </button>
                </div>
                <div className="w-1/4 flex flex-col items-end p-2">
                    <div
                        className="bg-white rounded-full p-2 hover:bg-gray-200 hover:outline-2 outline-gray-500 transition-all"
                        onClick={() => setMenu(!menu)}
                    >
                        <MenuIcon />
                    </div>
                    <div
                        className={`${menu ? "flex" : "hidden"} transition-all flex-col gap-2 bg-gray-800 absolute top-0 right-0 w-full`}
                    >
                        <ul className="flex flex-col items-center justify-center gap-5">
                            <li className="p-2 text-white" onClick={() => setMenu(!menu)}>
                                <MenuIcon fontSize="large" />
                            </li>
                            <li className="p-2">
                                <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <div className="font-bold text-xl bg-white p-3 rounded-full">
                                        <InventoryIcon /> <span className="p-2">Products</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="p-2">
                                <div className="flex flex-row items-center justify-center gap-2 bg-white p-5 rounded-full">
                                    <h3 className="font-bold text-xl">Filtros:</h3>
                                    <select
                                        className="p-4 text-white border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 focus:bg-gray-900"
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
                            </li>
                            <li className="p-2">
                                <NavLink to="/products/cart" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <div className="bg-white rounded-full p-3 hover:bg-gray-200 hover:outline-2 outline-gray-500">
                                        <ShoppingCartIcon /> <span className="text-xl px-2">Cart</span>
                                    </div>
                                </NavLink>
                            </li>
                            <li className="p-2">
                                <NavLink to="/products/user" className={({ isActive }) => (isActive ? "active" : "")}>
                                    <div className="text-white w-full flex flex-row gap-3 items-center justify-center">
                                        <Person2Icon fontSize="large" />
                                        <p className="text-bold text-2xl">{user ? user.username : "Cargando..."}</p>
                                    </div>
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside className="flex flex-row w-full h-max relative">
                <div className="w-1/4 h-screen fixed bg-gray-800 top-0 left-0 hidden lg:flex flex-col items-center justify-between pb-10 pt-5">
                    <h1 className="text-white font-bold text-4xl">Tienda Online</h1>
                    <div className="flex flex-col gap-5 items-center justify-center">
                        <NavLink to="/products" className={({ isActive }) => (isActive ? "active" : "")}>
                            <div className="font-bold text-xl bg-white p-3 rounded-full">
                                <InventoryIcon /> <span className="p-2">Products</span>
                            </div>
                        </NavLink>
                        <div className="flex flex-col items-center justify-center gap-2 bg-white p-3 pb-5 rounded-full">
                            <h3 className="font-bold text-xl">Filtros</h3>
                            <select
                                className="p-2 text-white border border-gray-500 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-900 focus:bg-gray-900"
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
                    </div>
                    <div className="flex flex-col gap-3 items-center justify-center">
                        <div className="flex justify-end items-center p-2">
                            <NavLink to="/products/cart" className={({ isActive }) => (isActive ? "active" : "")}>
                                <div className="bg-white rounded-full p-3 hover:bg-gray-200 hover:outline-2 outline-gray-500">
                                    <ShoppingCartIcon /> <span className="text-xl px-2">Cart</span>
                                </div>
                            </NavLink>
                        </div>
                        <NavLink to="/products/user" className={({ isActive }) => (isActive ? "active" : "")}>
                            <div className="text-white w-full flex flex-row gap-3 items-center justify-center">
                                <Person2Icon fontSize="large" />
                                <p className="text-bold text-2xl">{user ? user.username : "Cargando..."}</p>
                            </div>
                        </NavLink>
                    </div>
                </div>
                <div className="w-1/4 h-screen hidden lg:block"></div>
                <div className="w-full lg:w-3/4 h-max flex flex-col">
                    <Outlet />
                    
                </div>
            </aside>
        </>
    );
}
