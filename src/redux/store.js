import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
const store = configureStore({
  reducer: {
    api: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
      actionCreatorCheck:false,
    }),
});

export default store;
