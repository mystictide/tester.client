import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getWithDate } from "../../assets/js/helpers";
import mainService from "./mainService";

const flagger = JSON.parse(getWithDate("flagger"));
const lang = JSON.parse(getWithDate("lang"));
const flaggerScore = JSON.parse(getWithDate("flaggerScore"));
const langScore = JSON.parse(getWithDate("langScore"));

const initialState = {
  flagger: flagger ? flagger : null,
  lang: lang ? lang : null,
  flaggerScore: flaggerScore ? flaggerScore : null,
  langScore: langScore ? langScore : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
};

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
export const getRandomLanguage = createAsyncThunk(
  "main/getRandomLanguage",
  async (reqData, thunkAPI) => {
    try {
      const response = await mainService.getRandomLanguage(reqData);
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
    resetFlagger: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.flagger = null;
      state.flaggerScore = null;
      localStorage.removeItem("flagger");
      localStorage.removeItem("flaggerScore");
      localStorage.removeItem("prevFlags");
    },
    resetLang: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.lang = null;
      state.langScore = null;
      localStorage.removeItem("lang");
      localStorage.removeItem("langScore");
      localStorage.removeItem("prevLangs");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRandomFlag.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRandomFlag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.flagger = action.payload;
      })
      .addCase(getRandomFlag.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.flagger = null;
      })
      .addCase(getRandomLanguage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRandomLanguage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.lang = action.payload;
      })
      .addCase(getRandomLanguage.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = null;
        state.lang = null;
      });
  },
});

export const { resetFlagger, resetLang } = mainSlice.actions;
export default mainSlice.reducer;
