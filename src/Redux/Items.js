import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fireStore } from "../components/Firebase/Firebase";
import { collection, getDocs } from "firebase/firestore";


export const fetchProducts = createAsyncThunk(
  "item/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(
        collection(fireStore, "products")
      );

        const products = querySnapshot.docs.map(doc => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt
            ? data.createdAt.toDate().toISOString()
            : null
        };
        });


      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const item = createSlice({
  name: "item",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    removeProduct: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    }
  },

  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { removeProduct } = item.actions;
export default item.reducer;

