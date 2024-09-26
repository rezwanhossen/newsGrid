import React from 'react';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const Another = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex gap-5">
                <div  className="w-[60%]">
                <LeftSide></LeftSide>
                </div>
                <div className="w-[40%]">
                <RightSide></RightSide>
                </div>

            </div>
        </div>
    );
};

export default Another;