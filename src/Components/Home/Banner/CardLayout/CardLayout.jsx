
import React, { useEffect, useState } from 'react';
import Card from '../../../../Shared/Card';

const CardLayout = ({newsData}) => {
    
        return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {
                newsData?.slice(4 , 8).map(singleNews => <Card news={singleNews}></Card>)
            }
        </div>
    );
};

export default CardLayout;

