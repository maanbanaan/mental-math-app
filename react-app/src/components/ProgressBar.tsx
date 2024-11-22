import React from "react";
import "../styles/ProgressBar.css";

interface ProgressBarProps {
    remainingTime: number;
    totalTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ remainingTime, totalTime }) => {
    return (
        <div className="progress-container">
            <div className="progress-filler" style={{width: `${5 + 95 * remainingTime/totalTime}%`}}>
                <span className="progress-label">{`${remainingTime}s`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
