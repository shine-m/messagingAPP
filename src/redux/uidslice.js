import { createSlice } from "@reduxjs/toolkit";

const initialState = { uid: "", profilePicUrl: "" };
const uidSlice = createSlice({
  name: "uidprovider",
  initialState,
  reducers: {
    updateuid(state, action) {
      state.uid = action.payload;
    },
    updateProfilePicUrl(state, action) {
      state.profilePicUrl = action.payload;
    },
  },
});
export const { updateuid, updateProfilePicUrl } = uidSlice.actions;
export default uidSlice.reducer;
