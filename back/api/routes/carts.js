import { Router } from "express";
import CartController from "../controller/CartController.js";


export default function CreateCartsRoutes({AppModel}){

    const router = Router()
    const C_controller = new CartController({AppModel:AppModel})
    

    router.get("/:id",C_controller.Get_by_user_id)
    router.post("/Update",C_controller.UpdateCart)
    router.post("/Create",C_controller.CreateCart)
    router.delete("/Delete/:id",C_controller.DeleteCart)
    


    return router
}