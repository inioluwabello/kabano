'use client'

import React from "react";
import LoadingBar from "@/app/components/LoadingBar/LoadingBar";
import { selectBoardStatus, selectPageStatus, useSelector } from "@/lib/redux";

export const Loading = ({ pageLoading }: { pageLoading: boolean }) => {
    
    const [loadingPercentage, setLoadingPercentage] = React.useState(0);
    const boardState = useSelector(selectBoardStatus)
    const pageStatus = useSelector(selectPageStatus)

    // Simulate loading progress with a timer
    React.useEffect(() => {
        const interval = setInterval(() => {
            setLoadingPercentage((percentage: number) => {
                const newPercentage = percentage + 1;
                return newPercentage <= 100 ? newPercentage : 100;
            });
        }, 10);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {
                (boardState === 'loading' || pageStatus === 'loading' || pageLoading === true) && 
                <LoadingBar percentage={loadingPercentage} />
            }
        </>
    );
};
