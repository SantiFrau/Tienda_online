import { Router } from "express";
import CartController from "../controller/CartController.js";


export default function CreateCartsRoutes({AppModel}){

    const router = Router()
    const C_controller = new CartController({AppModel:AppModel})
    

    router.use("/:user_id",C_controller.Get_by_user_id)


    return router
}