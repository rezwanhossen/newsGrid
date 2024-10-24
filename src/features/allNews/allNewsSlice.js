import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    // categoriesNews : [],
    locationBasedNews: [],
    categoriesNews : [],
  };
  

const allNewsSlice = createSlice({
    name : "allnews",
    initialState ,
    reducers : {
         setLocationBasedNews : (state , action) => {
            return{
            ...state,
            locationBasedNews :  action.payload || state
        }
         },
         setCategoriesNews : (state , action) => {
                return {
                    ...state,
                    categoriesNews : action.payload || state
                }
         }
    }

});


export default allNewsSlice.reducer;
export const { setLocationBasedNews , setCategoriesNews } = allNewsSlice.actions;
