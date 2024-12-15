import { createSlice } from '@reduxjs/toolkit';
const requestSlice = createSlice({
    name:'request',
    initialState:null,
    reducers:{
        addRequest:(state,action)=>{
            return action.payload
        },
        removeRequest:(state,action)=>{
            const filteredRequests = state.filter((request)=> request._id !== action.payload)
            return filteredRequests
        }
    }
})

export const {addRequest, removeRequest} = requestSlice.actions
export default requestSlice.reducer