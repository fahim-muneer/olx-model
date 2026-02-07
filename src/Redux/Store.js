import { configureStore } from "@reduxjs/toolkit";
import moduleReducer from './ModalSlice'
import authReducer from "./AuthSlice";

const Store=configureStore({
    reducer:{
        modal:moduleReducer,
        auth:authReducer
        
    }

})
export default Store;