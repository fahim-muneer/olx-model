import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { 
  updateProfile,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

import { auth, provider } from "../components/Firebase/Firebase"; 

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      return {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(res.user, {
        displayName: name,
      });

      return {
        uid: res.user.uid,
        name: name,
        email: res.user.email,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: res.user.uid,
        email: res.user.email,
        name: res.user.displayName || "Anonymous", 
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await signOut(auth);
  }
);


const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
  state.user = action.payload;
}

  },

      extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, state => { state.loading = true; })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

          .addCase(loginUser.pending, state => { state.loading = true; })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

          .addCase(googleLogin.pending, state => { state.loading = true; })
          .addCase(googleLogin.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
          })
          .addCase(googleLogin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })

          .addCase(logoutUser.fulfilled, state => {
            state.user = null;
          });
      }

});
export const { setUser }=AuthSlice.actions;
export default AuthSlice.reducer;
