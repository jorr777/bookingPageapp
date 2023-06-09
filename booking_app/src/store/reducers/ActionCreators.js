import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const userLogin = createAsyncThunk('user/userLogin', async (userDate, thunkAPI) => {
    try {
        const result = await axios.post('http://localhost:5000/auth/login', {
            ...userDate
        })
        return result.data
    } catch (error) {
        return thunkAPI.rejectWithValue('hello rejected')
    }
})


export const AddUsers = createAsyncThunk(
    'user/postUsers',
    async (data) => {
        await axios.post('http://localhost:5000/data', {
                'id':Date.now(),
                ...data,
        }
        ).then((res) => {
            console.log(res)
        }).catch((err)=>{
            console.log(err.message)
        })
    }
)