import React from 'react';
import './LoadingBar.css'; // You can style the loading bar in a separate CSS file

const LoadingBar = ({ percentage }: { percentage: number }) => {
    const style = {
        width: `${percentage}%`,
    };

    return (
        <div className="loading-bar">
            <div className="loading-bar-progress" style={style}></div>
        </div>
    );
};

export default LoadingBar;
