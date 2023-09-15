import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    isLoading: false,
    connected : false,
    error: '',
    token: '',
    user : {
        firstname: '',
        lastname: ''
    }
 };

const userNPasswordState = {
    email: 'tony@stark.com',
    password: 'password123'
}

 export const fetchConnection = createAsyncThunk(
    'connection/fetchConnection',
    axios({
        method: 'post',
        url: 'http://localhost:3001/api/v1/user/login',
        data: userNPasswordState
    })
    .then(function(response) {
        console.log(response)
        console.log(response.data.body.token)
        initialState.token = response.data.body.token;
        console.log(initialState)
        initialState.user = {
            firstname: '',
            lastname: ''
        }
        console.log(initialState)
        return response;
    })
    .catch(function (error) {
        return error
    }) 
 )

 const connectionSlice = createSlice({
    name:'fetchConnection',
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchConnection.pending, state => {
            state.isLoading = true;
        })
        builder.addCase(fetchConnection.fulfilled, state => {
            state.isLoading = false;
            state.connected = true;
            state.error= '';
        })
        builder.addCase(fetchConnection.rejected, (state, action) => {
            state.isLoading = false;
            state.connected = false;
            state.error= action.error.message;
        })
    }   
 })

 export default connectionSlice.reducer;