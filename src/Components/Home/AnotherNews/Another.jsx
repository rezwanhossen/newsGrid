import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const Another = ({newsData}) => {

    return (
        
        
        
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-5">
                <div  className="w-[100%] lg:w-[60%]">
                <LeftSide newsData={newsData}></LeftSide>
                </div>
                <div className="w-[100%] lg:w-[40%]">
                <RightSide newsData={newsData}></RightSide>
                </div>

            </div>
        </div>
    );
};

export default Another;