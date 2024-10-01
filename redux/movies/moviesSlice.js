import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  lists: [],
  totalCount: 0,
  totalPages: 0,
  perPage: 0,
  movieDetail:{}
};

let headers= {
  'Origin': process.env.NEXT_BASE_URL, // Dynamic origin from the browser
}
export const getMovies = createAsyncThunk(
  "movies/fetchAll",
  async (params, thunkAPI) => {
    let page = params?.page || 1;
    try {
      const response = await axios.get(`/api/movies?page=${page}`,{headers});
      return response.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error; // Ném lỗi lại để Redux Toolkit xử lý
    }
  }
);

export const getMoviesByCaterogy = createAsyncThunk(
  "moviesCaterogy/fetchAll",
  async (params, thunkAPI) => {
    const type =params.type
    let page = params?.page || 1;
    try {
      const response = await axios.get(`/api/movies/caterogy/${type}?page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error; // Ném lỗi lại để Redux Toolkit xử lý
    }
  }
);


export const getMoviesBySearch = createAsyncThunk(
  "moviesSearch/fetchAll",
  async (params, thunkAPI) => {
    const query =params.query
    let page = params?.page || 1;
    try {
      const response = await axios.get(`/api/search?q=${query}&page=${page}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error; // Ném lỗi lại để Redux Toolkit xử lý
    }
  }
);



export const getMoviesDetail = createAsyncThunk(
  "moviesDetail/fetchAll",
  async (params, thunkAPI) => {
    let id = params?.id || 1;
  
    try {
      const response = await axios.get(`/api/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching message:", error);
      throw error; // Ném lỗi lại để Redux Toolkit xử lý
    }
  }
);

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.lists = action.payload.movies;
      state.totalPages = action.payload.totalPages;
    })
    builder.addCase(getMoviesByCaterogy.fulfilled, (state, action) => {
      state.lists = action.payload.movies;
      state.totalPages = action.payload.totalPages;
      
    });
    builder.addCase(getMoviesBySearch.fulfilled, (state, action) => {
      state.lists = action.payload.movies;
      state.totalPages = action.payload.totalPages;
      
    });
    builder.addCase(getMoviesDetail.fulfilled, (state, action) => {
      state.movieDetail = action.payload.movies[0];
      
    });
  },
});

export default moviesSlice.reducer;
