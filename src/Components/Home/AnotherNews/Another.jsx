import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const Another = ({newsData}) => {

    return (
        
        
        
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div  className="lg:col-span-8 lg:pr-10 border-r border-current">
                <LeftSide newsData={newsData}></LeftSide>
                </div>
                <div className="lg:col-span-4">
                <RightSide newsData={newsData}></RightSide>
                </div>

            </div>
        </div>
    );
};

export default Another;