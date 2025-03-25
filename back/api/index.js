import express from "express";
import cors from "cors";
import CreateUserRouter from "./routes/users.js";
import CreateProductsRouter from "./routes/products.js";
import CreateCartsRoutes from "./routes/carts.js";

export default function CreateApp({ AppModel }) {
    const PORT = process.env.PORT || 1234;
    const server = express();

    server.disable("x-powered-by");

    // Middleware para habilitar CORS correctamente
    server.use(cors({
        origin: "*", // Puedes cambiar esto a tu frontend específico
        methods: ["GET", "POST", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    server.use(express.json()); // Middleware para interpretar JSON en el body

    const user_Routes = CreateUserRouter({ AppModel });
    const products_Routes = CreateProductsRouter({ AppModel });
    const carts_Routes = CreateCartsRoutes({ AppModel });
    // Definir rutas
    server.use("/products", products_Routes);
    server.use("/users", user_Routes);
    server.use("/carts", carts_Routes);

    server.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`);
    });
}

