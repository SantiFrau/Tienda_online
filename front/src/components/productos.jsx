import { useContext, useEffect, useState } from "react";
import { get_prods, get_prods_by_category } from "../get_prod";
import ProdSelected from "./selectProduct";
import { UserContext } from "./context";
import { useNavigate } from "react-router-dom";

export default function Products() {
    const [productos, setProductos] = useState([]);
    const [prodSelected, setProdSelected] = useState(false);
    const { user, categoria ,search} = useContext(UserContext);
    const [page, setPage] = useState(1);
    let navigate = useNavigate();
    const limit = 10;
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    async function get(reset = false) {
        if (loading || !hasMore) return;
        setLoading(true);

        try {
            let prods;
            if (categoria === "all") {
                prods = await get_prods({ limit, page: reset ? 1 : page });
            } else {
                prods = await get_prods_by_category({ limit, page: reset ? 1 : page, category: categoria });
            }

            if (prods.Error) {
                setHasMore(false);
                return;
            }

            setProductos(prev => reset ? [...prods] : [...prev, ...prods]);
            setPage(prev => reset ? 2 : prev + 1);
        } catch (error) {
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setProductos([]); // Limpiar productos al cambiar categoría
        setPage(1);
        setHasMore(true);
        get(true); // Cargar desde la página 1
    }, [categoria]); // Se ejecuta cuando cambia la categoría

    useEffect(() => {
        function handleScroll() {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.offsetHeight - 100 &&
                !loading &&
                hasMore
            ) {
                get();
            }
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [loading, hasMore]);

    const filteredProducts = productos.filter(product =>
        product.title.toLowerCase().includes(search.toLowerCase()) // Filtrar por nombre
    );

    return (
        <>
            <div className="bg-gray-300 w-full flex items-center justify-center gap-5 flex-wrap p-5 py-30">
                {filteredProducts.map((prod) => (
                    <div
                        key={prod.id}
                        onClick={() => setProdSelected(prod)}
                        className="hover:scale-110 transition-all hover:border-2 border-gray-600 flex flex-col items-center justify-around gap-3 bg-white p-10 rounded-lg w-70 h-90"
                    >
                        <img className="w-2/3 max-h-2/3" src={prod.image} alt="" />
                        <h4 className="w-2/3 truncate font-bold text-xl">{prod.title}</h4>
                        <p className="text-green-600 font-bold">${prod.price}</p>
                    </div>
                ))}
            </div>

            {loading && <p className="text-center text-gray-500">Cargando más productos...</p>}
            {!hasMore && <p className="text-center text-red-500">No hay más productos disponibles.</p>}

            <ProdSelected prodSelected={prodSelected} setProdSelected={setProdSelected} />
        </>
    );
}
