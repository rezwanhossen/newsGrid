


import TwoColumnLayout from "./TwoColumnLayout/TwoColumnLayout";
import { Parallax } from "react-parallax";
import ThreeColumnLayout from "./ThreeColumnLayout/ThreeColumnLayout";
import Carousel from "./Carousel/Carousel";
import { useEffect, useState } from "react";
import useNews from "../../../hooks/useNews";











const News = () => {
    const [country , setCountry] = useState('us');
    const [category , setCategory] = useState('business');
    const [newsData] = useNews(country , category);
    
    
    if(!newsData){
        return <div className="h-screen">Loading ....</div>
    }

    



        const handleCategoryChange= (e) => {
                console.log(e.target.value);
                setCategory(e.target.value);
        }
        const handleCountryChange = (e) => {
            console.log(e.target.value);
            setCountry(e.target.value);
        }
    



    return (
        <div>
            {/* category */}
            
                <div className="flex justify-between max-w-7xl mx-auto">
                    <div>
                        <h1 className="text-xl font-bold">Real Time NEWS</h1>
                    </div>
                        {/* category */}
                        <div>
                        {/* value={selectedOption} */}
                        <label htmlFor="options">Category</label>
                        
                        
                            <select id="options"  onChange={handleCategoryChange}>
                            
                            <option value="business">Business</option>
                            <option value="entertainment">Entertainment</option>
                            <option value="sports">Sports</option>
                            <option value="general">General</option>
                            <option value="technology">Technology</option>
                            <option value="health">Health</option>
                            <option value="science">Science</option>
                        </select>
                        </div>
                        {/* Country */}
                        <div>
                        {/* value={selectedOption} */}
                        <label htmlFor="options">Country</label>
                            <select id="options"onChange={handleCountryChange}>

                            <option value="us">United State Of America</option>
                            <option value="bd">Bangladesh</option>
                            <option value="au">Australia</option>
                            <option value="in">India</option>
                            <option value="de">Germany</option>
                            <option value="fr">France</option>
                            <option value="jp">Japan</option>
                            <option value="cn">China</option>
                            <option value="it">Italy</option>
                            
                        </select>
                        </div>

                </div>

            
                                 
                                
            





            {/* news */}
            <div className="max-w-7xl mx-auto mt-4">
                {/* two column layout  */}
                 <TwoColumnLayout data={newsData?.slice(8 , 10)}></TwoColumnLayout>
                <ThreeColumnLayout data={newsData?.slice(10 , 22)}></ThreeColumnLayout> 
            </div>
             <Carousel data ={newsData?.slice(22 , 29)}></Carousel>

             
             
             {/* Pagination বাটন */}
            {/* <div> */}
                {/* <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className="btn"
                >
                    Previous Page
                </button>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={news.length < itemsPerPage}
                    className="btn"
                >
                    Next Page
                </button> */}
            {/* </div> */}



        </div>

        

    );
};

export default News;