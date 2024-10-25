import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    // categoriesNews : [],
    locationBasedNews: [],
    categoriesNews : [],
    allTrendingNews  : [],
    newsData : [],
    recomendedNews : [],
    breakingNews : []

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
         },
         setNewsData : (state , action) => {
                return {
                    ...state,
                    newsData : action.payload || state
                }
         },
         setAllNewsTrending : (state , action) => {
                return {
                    ...state,
                    allTrendingNews : action.payload || state
                }
         },
         setAllRecommendedNews : (state , action) => {
                return {
                    ...state,
                    recomendedNews : action.payload || state
                }
         },
         setAllBreakingNews : (state , action) => {
                return {
                    ...state,
                    breakingNews : action.payload || state
                }
         },
    }

});


export default allNewsSlice.reducer;
export const { setLocationBasedNews , setCategoriesNews  , setNewsData , setAllNewsTrending , setAllRecommendedNews , setAllBreakingNews} = allNewsSlice.actions;
