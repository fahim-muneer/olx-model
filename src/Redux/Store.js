import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from './ModalSlice'
import authReducer from "./AuthSlice";
import sellModal from "./SellModal"
import itemReducer from "./Items"
import cartReducer from "./CartSlice";
const Store=configureStore({
    reducer:{
        modal:moduleReducer,
        auth:authReducer,
        sell:sellModal,
        item:itemReducer,
        cart:cartReducer,
        
        
        
        
    }

})
export default Store;