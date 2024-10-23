import { createSlice } from "@reduxjs/toolkit";



const initialState = "";

const searchNewsSlice = createSlice({
    name : "newsSearch",
    initialState ,
    reducers : {
         searchNews : (state , action) => {
               return action.payload || state
         }
    }

});


export default searchNewsSlice.reducer;
export const {  searchNews  } = searchNewsSlice.actions;
