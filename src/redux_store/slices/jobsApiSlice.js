import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body = JSON.stringify({
      limit: 10,
      offset: 0,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body,
    };
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      requestOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
});

const initialState = {
  jobs: [],
  filters: {},
  companyName: "",
  loading: true,
  error: null,
};

const jobsApiSlice = createSlice({
  name: "jobsApi",
  initialState,
  reducers: {
    selectedFilters: (state, action) => {
      state.filters = action.payload;
    },
    setCompanyname: (state, action) => {
      state.companyName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchJobs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchJobs.fulfilled, (state, action) => {
      state.loading = false;
      state.jobs = action.payload;
    });
    builder.addCase(fetchJobs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default jobsApiSlice.reducer;
export const { selectedFilters, setCompanyname } = jobsApiSlice.actions;
export const filters = (state) => state.jobsApi.filters;
export const companyName = (state) => state.jobsApi.companyName;
export const selectJobs = (state) => state.jobsApi.jobs;
export const selectLoading = (state) => state.jobsApi.loading;
export const selectError = (state) => state.jobsApi.error;
