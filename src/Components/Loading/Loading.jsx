import React from 'react';
import './Loading.css';

const Loading = () => {
    return (
        <div className="flex items-center justify-center calScreen">
                <span className="loading loading-spinner loading-lg text-blue-950"></span>
        </div>
    );
};

export default Loading;