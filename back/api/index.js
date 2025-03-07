import  express  from "express";
import CreateUserRouter from "./routes/users.js";
import CreateProductsRouter from "./routes/products.js";

export default function CreateApp({AppModel}){

    const PORT = process.env.PORT || 1234
    const server = express();
    const user_Routes = CreateUserRouter({AppModel})
    const products_Routes = CreateProductsRouter({AppModel})
    server.disable("x-powered-by")

    server.use(express.json()); //midleware para combertir los metodo post que venga y acceder directamente al cuerpo


     server.options("/movies",(req,res)=>{ //coors
        res.header("Access-Control-Allow-Origin","*") //se le agrega al options tambien porque estos
        res.header("Access-Control-Allow-Methods","GET , POST , DELETE , PATCH")
        //se le agrega a que tiene acceso la ruta
        res.send() //termninar la peticion
    })

    server.use("/products",products_Routes);
    server.use("/users",user_Routes);

    server.listen(PORT,()=>{
        console.log(`http://localhost:${PORT}`)
    })
}