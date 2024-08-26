import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import modalItemReducer from "./slices/ModalItemSlice";

const store = configureStore({
  reducer: {
    modalItem: modalItemReducer,
    auth: authReducer,
  },
});

export default store;
