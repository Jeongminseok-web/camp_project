import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GET_AREAS_API_URL,
  POST_AREAS_API_URL,
  DELETE_AREAS_API_URL,
  UPDATE_ADD_AREAS_URL,
} from "../../utils/apiUrl";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
} from "../../utils/requestMethods";

const getItemsFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (userId) => {
    // console.log(apiURL, userId);
    const fullPath = `${apiURL}/${userId}`;
    return await getRequest(fullPath);
  });
};

const postItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (postData) => {
    // console.log(postData);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData), // 표준 json 문자열로 변환
    };
    return await postRequest(apiURL, options);
  });
};

const deleteItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (id) => {
    // console.log(postData);
    const options = {
      method: "DELETE",
    };
    const fullPath = `${apiURL}/${id}`;
    return await deleteRequest(fullPath, options);
  });
};

const updateAddFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (data) => {
    // console.log(options);
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    return await patchRequest(apiURL, options);
  });
};

export const fetchGetItemsData = getItemsFetchThunk(
  "fetchGetItems",
  GET_AREAS_API_URL
);

export const fetchPostItemData = postItemFetchThunk(
  "fetchPostItem",
  POST_AREAS_API_URL
);

export const fetchDeleteItemData = deleteItemFetchThunk(
  "fetchDeleteItem",
  DELETE_AREAS_API_URL
);

export const fetchUpdateAddData = updateAddFetchThunk(
  "fetchUpdateCompleted",
  UPDATE_ADD_AREAS_URL
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
  initialState: {
    getItemData: null,
    postItemData: null,
    deleteItemData: null,
    updateAddData: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetItemsData.fulfilled, handleFullfilled("getItemsData"))
      .addCase(fetchGetItemsData.rejected, handleRejected)
      .addCase(fetchPostItemData.fulfilled, handleFullfilled("postItemData"))
      .addCase(fetchPostItemData.rejected, handleRejected)
      .addCase(
        fetchDeleteItemData.fulfilled,
        handleFullfilled("deleteItemData")
      )
      .addCase(fetchDeleteItemData.rejected, handleRejected)
      .addCase(fetchUpdateAddData.fulfilled, handleFullfilled("updateAddData"))
      .addCase(fetchUpdateAddData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
