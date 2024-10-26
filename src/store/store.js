import { configureStore } from '@reduxjs/toolkit'
import { gameSlicer } from './slicers/gameSlicer';

export const store = configureStore({
  reducer: {
    game: gameSlicer.reducer,
  },
})