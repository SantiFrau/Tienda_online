import CreateApp from "./index.js";
import UsersModel from "./model/UsersModel.js";
import CartModel from "./model/CartModel.js";
import ProductModel from "./model/ProdutModel.js";
const AppModel ={
    UsersModel,
    CartModel,
    ProductModel
}

CreateApp({AppModel:AppModel})