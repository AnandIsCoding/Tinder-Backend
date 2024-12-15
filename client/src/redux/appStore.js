import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice.js'
import requestReducer from './slices/requestSlice.js'
import connectionReducer from './slices/connectionSlice.js'
import feedReducer from './slices/feedSlice.js'

const appStore = configureStore({
    reducer : {
        user:userReducer,
        request:requestReducer,
        connection:connectionReducer,
        feed:feedReducer
    }
})

export default appStore