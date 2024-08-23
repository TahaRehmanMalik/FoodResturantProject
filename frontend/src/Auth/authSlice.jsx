import {createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    status:'idle',
    create: null,
    loginMessage:null,
    accessLoginToken:null,
    userChecked:false,
    error: null,
    mailSent:false,
    passwordReset:false,
    googleData:null
  }
  export const createSignupAsync=createAsyncThunk('auth/createSignup',
    async(userData)=>{
        try {
            const response=await axios.post('http://localhost:5000/user/create',userData,{
              headers:{ 'Content-Type': 'application/json' },
              withCredentials:true
            })
            return response.data;
        } catch (error) {
            console.error(error)
        }
    })
    export const loginUserAsync=createAsyncThunk('auth/loginUser',
      async(loginData)=>{
        try {
          const response=await axios.post('http://localhost:5000/user/login',loginData,{
            headers:{ 'Content-Type': 'application/json' },
            withCredentials: true
          })
          return response.data;
        } catch (error) {
          console.error(error);
        }
      })

      export const checkAuthAsync=createAsyncThunk('auth/checkAuth',
        async()=>{
          try {
            const response=await axios.get('http://localhost:5000/user/check',
              {withCredentials:true

            })
            return response.data;
          } catch (error) {
            console.error(error);
          }
        })
        export const signOutAsync=createAsyncThunk('auth/signOut',
          async()=>{
            try {
              const response=await axios.get('http://localhost:5000/user/logout',{
                withCredentials:true
              })
              return response.data;
            } catch (error) {
              console.error(error);
            }
          }
        )
        export const resetPasswordRequestAysnc=createAsyncThunk('auth/resetPasswordRequest',
          async(sendData)=>{
           try {
            console.log(sendData);
            const response=await axios.post('http://localhost:5000/user/reset-password-request',sendData,{
              headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
           } catch (error) {
            console.error(error);
           }
          }
        )
        export const resetPasswordAsync=createAsyncThunk('auth/resetPassword',
          async(userData)=>{
            console.log("The reset password data is",userData);
            try {
              console.log(userData);
            const response=await axios.post('http://localhost:5000/user/reset-password',userData,{
              headers: { 'Content-Type': 'application/json' }
            });
            return response.data;
            } catch (error) {
              console.error(error);
            }
          }
        )
        export const googleAuthenticateAsync=createAsyncThunk('auth/googleAuthenticate',
          async()=>{
            try {
              const response=await axios.get('http://localhost:5000/auth/google');
              return response.data;
            } catch (error) {
              console.error(error); 
            }
          }
        )
    const authSlice = createSlice({
        name: 'auth',
        initialState,
        reducers: {
          resetLogin: (state) => {
            state.loginMessage = null;
          },
          resetCreateUser: (state) => {
            state.create = null;
          },
        },
        extraReducers: (builder) => {
          // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
          builder
          .addCase(createSignupAsync.pending, (state, action) => {
            state.status = 'loading'
          })
          // Pass the generated action creators to `.addCase()`
          .addCase(createSignupAsync.fulfilled, (state, action) => {
            // Same "mutating" update syntax thanks to Immer
            state.status = 'succedd'
            state.accessLoginToken = action.payload;
          })
          .addCase(createSignupAsync.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
          .addCase(loginUserAsync.pending, (state, action) => {
            state.status = 'loading'
          })
          // Pass the generated action creators to `.addCase()`
          .addCase(loginUserAsync.fulfilled, (state, action) => {
            // Same "mutating" update syntax thanks to Immer
            state.status = 'succedd'
            state.accessLoginToken = action.payload;
          })
          .addCase(loginUserAsync.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
          .addCase(checkAuthAsync.pending, (state, action) => {
            state.status = 'loading'
          })
          // Pass the generated action creators to `.addCase()`
          .addCase(checkAuthAsync.fulfilled, (state, action) => {
            // Same "mutating" update syntax thanks to Immer
            state.status = 'succedd'
            state.accessLoginToken = action.payload;
            state.userChecked= true;
          })
          .addCase(checkAuthAsync.rejected, (state, action) => {
            state.status = 'failed'
            state.userChecked= true;
            // state.error = action.error.message;
          })
          .addCase(signOutAsync.pending, (state, action) => {
            state.status = 'loading'
          })
          // Pass the generated action creators to `.addCase()`
          .addCase(signOutAsync.fulfilled, (state, action) => {
            // Same "mutating" update syntax thanks to Immer
            state.status = 'succedd'
            state.accessLoginToken = null;
           
          })
          .addCase(signOutAsync.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
          .addCase(resetPasswordRequestAysnc.pending, (state, action) => {
            state.status = 'loading'
          })
          // Pass the generated action creators to `.addCase()`
          .addCase(resetPasswordRequestAysnc.fulfilled, (state, action) => {
            // Same "mutating" update syntax thanks to Immer
            state.status = 'succedd'
            state.mailSent = true;
           
          })
          .addCase(resetPasswordRequestAysnc.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
          .addCase(resetPasswordAsync.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(resetPasswordAsync.fulfilled, (state, action) => {
            // Same "mutating" update syntax thanks to Immer
            state.status = 'succedd'
            state.passwordReset= true;
           
          })
          .addCase(resetPasswordAsync.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })
       
          .addCase(googleAuthenticateAsync.pending, (state, action) => {
            state.status = 'loading'
          })
          .addCase(googleAuthenticateAsync.fulfilled, (state, action) => {
            // Same "mutating" update syntax thanks to Immer
            state.status = 'succedd'
            state.googleData=action.payload;
           
          })
          .addCase(googleAuthenticateAsync.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message;
          })

        },
      })
        export const {resetLogin}=authSlice.actions;
        export const {resetCreateUser}=authSlice.actions;
        export const  selectUser=(state)=>state.auth.create;
        export const  selectLoginUser=(state)=>state.auth.loginMessage;
       export const selectAccessToken=(state)=>state.auth.accessLoginToken;
       export const selectUserChecked= (state)=>state.auth.userChecked;
       export const selectMail=(state)=>state.auth.mailSent;
       export const selectResetPassword=(state)=>state.auth.passwordReset;
      export default authSlice.reducer;