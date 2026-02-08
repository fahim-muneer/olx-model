import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE={
    openSellModal: false,
};
const SellModal=createSlice({
    name:'Sell',
    initialState:INITIAL_STATE,
    reducers:{
        openSell:(state)=>{state.openSellModal = true},
        closeSell:(state)=>{state.openSellModal = false}

    }
})

export const{openSell ,closeSell }=SellModal.actions;
export default SellModal.reducer;