import { asyncThunkCreator, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const initialState = {
    status: 'idle',
    todos: null,
    error: null,
    list:[],
  }
  export const createReserveFormAsync = createAsyncThunk('reservation/createReserveForm',
     async (formData,{ rejectWithValue }) => {
    // Just make the async request here, and return the response.
    // This will automatically dispatch a `pending` action first,
    // and then `fulfilled` or `rejected` actions based on the promise.
    // as needed based on the
    try {
      const res = await axios.post('http://localhost:5000/api/send',formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      })
    return res.data
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 200 range
        return rejectWithValue(error.response.data);
      } else {
        // Other errors (network issues, etc.)
        return rejectWithValue({ message: error.message });
      }
    }
  })
  export const getReserveDataAsync=createAsyncThunk('reservation/getReserveData',
    async()=>{
  try {
    const response=await axios.get("http://localhost:5000/api",{
      withCredentials: true
    });
    console.log("The response data is",response);
    return response.data;
  } catch (error) {
    return console.error(error);
  }
  })
  export const reservationSlice = createSlice({
    name: 'reservation',
    initialState,
    reducers: {
      // any additional "normal" case reducers here.
      // these will generate new action creators
      resetMessager: (state) => {
        state.todos = null;
      },
      resetError: (state) => {
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      // Use `extraReducers` to handle actions that were generated
      // _outside_ of the slice, such as thunks or in other slices
      builder
        .addCase(createReserveFormAsync.pending, (state, action) => {
          state.status = 'loading'
        })
        // Pass the generated action creators to `.addCase()`
        .addCase(createReserveFormAsync.fulfilled, (state, action) => {
          // Same "mutating" update syntax thanks to Immer
          state.status = 'succedd'
          state.todos = action.payload.message;
        })
        .addCase(createReserveFormAsync.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
        .addCase(getReserveDataAsync.pending, (state, action) => {
          state.status = 'loading'
        })
        // Pass the generated action creators to `.addCase()`
        .addCase(getReserveDataAsync.fulfilled, (state, action) => {
          // Same "mutating" update syntax thanks to Immer
          state.status = 'succedd'
          state.list = action.payload;
        })
        .addCase(getReserveDataAsync.rejected, (state, action) => {
          state.status = 'failed'
          state.error = action.error.message;
        })
    },
  })
  export const {resetMessager}=reservationSlice.actions;
  export const { resetError}=reservationSlice.actions;
  export const reserveData=(state)=>state.reservation.todos;
  export const reserveError=(state)=>state.reservation.error;
  export const dataReservation=(state)=>state.reservation.list;
  export const selectStatus=(state)=>state.reservation.status;
  export default reservationSlice.reducer
