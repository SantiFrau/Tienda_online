import { Router } from "express";
import ProductController from "../controller/ProductController.js";
export default function CreateProductsRouter({AppModel}){

   const router = Router();
   const P_controller = new ProductController({AppModel:AppModel})

   router.get("/",P_controller.GetAll)
   router.get("/:id",P_controller.Get_by_id)


   return router

}