import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithDate } from "../../assets/js/helpers";
import mainService from "./mainService";

const countries = JSON.parse(getWithDate("countries"));

const initialState = {
  countries: countries ? countries : null,
  flag: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

export const getCountries = createAsyncThunk(
  "main/getCountries",
  async (thunkAPI) => {
    try {
      const response = await mainService.getCountries();
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRandomFlag = createAsyncThunk(
  "main/getRandomFlag",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.getRandomFlag(reqData);
      if (response.status === 500) {
        return thunkAPI.rejectWithValue(response);
      }
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.countries = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.countries = null;
      })
      .addCase(getRandomFlag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRandomFlag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.flag = action.payload;
      })
      .addCase(getRandomFlag.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.flag = null;
      });
  },
});

export const { reset } = mainSlice.actions;
export default mainSlice.reducer;
