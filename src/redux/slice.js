import { createSlice } from "@reduxjs/toolkit";

const areaSlice = createSlice({
  name: "area",
  initialState: null,
  reducers: {
    setArea: (state, action) => {
      return action.payload;
    },
    clearArea: (state) => {
      return null;
    },
  },
});

export const { setArea, clearArea } = areaSlice.actions;
export default areaSlice.reducer;