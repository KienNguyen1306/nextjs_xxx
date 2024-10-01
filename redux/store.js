import { configureStore } from '@reduxjs/toolkit'
import moviesSlice from './movies/moviesSlice'
import caterogySlice from './caterogy/caterogySlice'

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    caterogys:caterogySlice
  },
})