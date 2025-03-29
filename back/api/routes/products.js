import { Router } from "express";
import ProductController from "../controller/ProductController.js";
export default function CreateProductsRouter({AppModel}){

   const router = Router();
   const P_controller = new ProductController({AppModel})

   // /products todos , /products?category=""  ///products?limit=""&page=""
   router.get("/",P_controller.GetAll)

   router.get("/categories", P_controller.GetCategories)
   router.get("/:id",P_controller.Get_by_id)

   
   router.get("/search/:search", P_controller.Search)

   

   return router

}