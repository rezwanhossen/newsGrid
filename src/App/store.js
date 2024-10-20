import { configureStore } from "@reduxjs/toolkit";
import newsSearchReducer from "../features/searchNews/searchNewsSlice";


const store = configureStore({
        reducer : {
            newsSearch : newsSearchReducer
        }
});
export default store;