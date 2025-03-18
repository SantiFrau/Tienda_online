import { Router } from "express";
import UsersController from "../controller/UsersController.js";

export default function CreateUserRouter({AppModel}){
    
    const U_controller = new UsersController({AppModel:AppModel})
    const router = Router()

    router.get("/login",U_controller.Login)
    router.post("/register",U_controller.Register)
    router.get("/validate-token",U_controller.ValidateToken)

    return router
}