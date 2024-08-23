import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    status: 'idle',
    error: null,
    list:[],
  }
  export const getDishDataAsync=createAsyncThunk('home/getDishData',
    async({page,filterSection})=>{
      
        try {
          const url=`http://localhost:5000/dish?page=${page}&category=${filterSection}`;
          console.log("The route url is",url);
            const response=await axios.get(url,{
              withCredentials:true
            });
            return response.data;
        } catch (error) {
            console.error(error);
        }
    })
    export const homeSlice = createSlice({
        name: 'home',
        initialState,
        reducers: {
          // any additional "normal" case reducers here.
          // these will generate new action creators
        },
        extraReducers: (builder) => {
          // Use `extraReducers` to handle actions that were generated
          // _outside_ of the slice, such as thunks or in other slices
          builder
            .addCase(getDishDataAsync.pending, (state, action) => {
              state.status = 'loading'
            })
            // Pass the generated action creators to `.addCase()`
            .addCase(getDishDataAsync.fulfilled, (state, action) => {
              // Same "mutating" update syntax thanks to Immer
              state.status = 'succeeded'
              state.list = action.payload
            })
            .addCase(getDishDataAsync.rejected, (state, action) => {
              state.status = 'failed'
              state.error = action.error.message
            })
        },
      })
      export const selectDishes=(state)=>state.home.list;
      export const selectStatus=(state)=>state.home.status;
      export default homeSlice.reducer