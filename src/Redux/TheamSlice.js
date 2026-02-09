import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme") || "light";

const Theme = createSlice({
  name: "theme",
  initialState: {
    mode: initialTheme,
  },
  reducers: {
    toggleTheme: (state) => {   
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode); 
    },
  },
});

export const { toggleTheme } = Theme.actions;
export default Theme.reducer;
