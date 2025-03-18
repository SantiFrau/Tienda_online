import { Router } from "express";
import CartController from "../controller/CartController.js";


export default function CreateCartsRoutes({AppModel}){

    const router = Router()
    const C_controller = new CartController({AppModel:AppModel})
    

    router.get("/:id",C_controller.Get_by_user_id)
    router.post("/Update/:id",C_controller.UpdateCart)
    router.post("/Create/:id",C_controller.UpdateCart)
    router.delete("/Delete/:id",C_controller.UpdateCart)
    


    return router
}