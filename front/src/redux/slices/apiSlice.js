import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  GET_AREAS_API_URL,
  POST_AREAS_API_URL,
  DELETE_AREAS_API_URL,
  UPDATE_ADD_AREAS_URL,
  UPDATE_AREAS_API_URL,
} from "../../utils/apiUrl";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
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
  return createAsyncThunk(actionType, async (options) => {
    // console.log(options);
    return await patchRequest(apiURL, options);
  });
};

const updateItemFetchThunk = (actionType, apiURL) => {
  return createAsyncThunk(actionType, async (updateData) => {
    // console.log(updateData);
    const options = {
      body: JSON.stringify(updateData), // 표준 json 문자열로 변환
    };
    return await putRequest(apiURL, options);
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

export const fetchPutItemData = updateItemFetchThunk(
  "fetchPutItem",
  UPDATE_AREAS_API_URL
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
    updatePutData: null,
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
      .addCase(fetchUpdateAddData.rejected, handleRejected)
      .addCase(fetchPutItemData.fulfilled, handleFullfilled("updatePutData"))
      .addCase(fetchPutItemData.rejected, handleRejected);
  },
});

export default apiSlice.reducer;
