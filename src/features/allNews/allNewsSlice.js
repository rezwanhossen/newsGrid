import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    // categoriesNews : [],
    locationBasedNews: []
  };
  

const allNewsSlice = createSlice({
    name : "allnews",
    initialState ,
    reducers : {
         setLocationBasedNews : (state , action) => {
               return state.locationBasedNews = action.payload || state
         }
    }

});


export default allNewsSlice.reducer;
export const { setLocationBasedNews  } = allNewsSlice.actions;
