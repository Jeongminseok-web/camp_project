import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET_AREAS_API_URL } from "../../utils/apiUrl";
import { getRequest } from "../../utils/requestMethods";

const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

export const fetchGetItemsData = getItemsFetchThunk(
  "fetchGetItems",
  GET_AREAS_API_URL
);

const handleFullfilled = (stateKey) => (state, action) => {
  state[stateKey] = action.payload;
};

const handleRejected = (state, action) => {
  console.log(action.payload);
  state.isError = true;
};

const apiSlice = createSlice({
  name: "api",
  initialize: {
    getItemData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFullfilled("getItemsData"))
      .addCase(fetchGetItemsData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
