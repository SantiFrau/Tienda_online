import { Router } from "express";
import UsersController from "../controller/UsersController.js";

export default function CreateUserRouter({AppModel}){
    
    const U_controller = new UsersController({AppModel:AppModel})
    const router = Router()

    router.get("/",U_controller.GetAll)
    router.get("/:username",U_controller.Get_by_username)

    return router
}