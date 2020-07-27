import React from 'react';
import {CommonHeader, CommonMenuBar, CommonContainer} from '../boxes';

function CommonPage() {
    return (
        <div className="container">
            <CommonHeader />
            <CommonMenuBar />
            <CommonContainer /> 
        </div>
    );
}

export default CommonPage;