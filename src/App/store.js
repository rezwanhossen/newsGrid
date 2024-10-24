import { configureStore } from "@reduxjs/toolkit";
import newsSearchReducer from "../features/searchNews/searchNewsSlice";

=======
import allNewsReducer from "../features/allNews/allNewsSlice";



const store = configureStore({
        reducer : {

            newsSearch : newsSearchReducer,
            allNews : allNewsReducer

        }
});
export default store;