import { Router } from "express";
import ProductController from "../controller/ProductController.js";
export default function CreateProductsRouter({ModelApp}){

   const router = Router();
   const P_controller = new ProductController({ModelApp:ModelApp})

   router.get("/",P_controller.GetAll)
   router.get("/:id",P_controller.Get_by_id)


   return router

}