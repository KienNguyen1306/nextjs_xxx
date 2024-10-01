import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
};

export const getCaterogy = createAsyncThunk(
  "caterogy/fetchAll",
  async (params, thunkAPI) => {
    try {
      const response = await axios.get(`/api/caterogys`);
      return response.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error; // Ném lỗi lại để Redux Toolkit xử lý
    }
  }
);




export const caterogySlice = createSlice({
  name: "caterogy",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCaterogy.fulfilled, (state, action) => {
      state.lists = action.payload.results;
    })
   
  },
});

export default caterogySlice.reducer;
