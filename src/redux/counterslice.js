import { createSlice } from "@reduxjs/toolkit";

const initialState = { count: 14 };
const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    inc(state) {
      state.count = parseInt(state.count, 10)
        ? parseInt(state.count, 10) + 1
        : initialState[count];
    },
    dec(state) {
      state.count = parseInt(state.count, 10)
        ? parseInt(state.count, 10) - 1
        : initialState[count];
    },
    inpvalue(state, action) {
      state.count =
        parseInt(action.payload, 10) == NaN ? "" : parseInt(action.payload, 10);
    },
  },
});
export const { inc, dec, inpvalue } = counterSlice.actions;
export default counterSlice.reducer;
