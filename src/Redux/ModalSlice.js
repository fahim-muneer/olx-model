import { createSlice } from "@reduxjs/toolkit";
const INITIAL_STATE={
    openModal: false,
};
const ModalSlice=createSlice({
    name:'Modal',
    initialState:INITIAL_STATE,
    reducers:{
        open:(state)=>{state.openModal = true},
        close:(state)=>{state.openModal = false}

    }
})
export const {open,close} = ModalSlice.actions;

export default ModalSlice.reducer;