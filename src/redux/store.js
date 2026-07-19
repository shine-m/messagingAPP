import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterslice";
import imagedirReducer from "./imagesSlice";
import uidReducer from "./uidslice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    imageDir: imagedirReducer,
    user: uidReducer,
  },
});
export default store;
