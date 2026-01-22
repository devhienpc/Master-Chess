import React from 'react';
import {Container} from "@mui/material";
import {Line} from 'react-chartjs-2';
import 'chart.js/auto';

import styles from './index.module.css'
import userContext, {useUser} from "@/Contexts/UserContext.jsx";

export const WelcomeArea = () => {

    const {currentUser} = useUser();

    // Define the data for the chart
    const winRateChartData = {
        labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'], // example game labels
        datasets: [
            {
                label: 'Win Rate',
                data: [50, 60, 70, 85, 90], // example win rate percentages
                fill: false,
                borderColor: '#1976d2',
                tension: .1
            }
        ]
    };

    // Define options for the chart
    const winRateChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 100 // assuming win rate is a percentage
            }
        },
        maintainAspectRatio: false // Add this to prevent default height
    };

    const eloChartData = {
        labels: ['Game 1', 'Game 2', 'Game 3', 'Game 4', 'Game 5'], // example game labels
        datasets: [
            {
                label: 'ELO',
                data: [1800, 1850, 1900, 2000, 2050], // example win rate percentages
                fill: false,
                borderColor: 'rgb(0,0,0)',
                tension: 0.1
            }
        ]
    };

    // Define options for the chart
    const eloChartOptions = {
        scales: {

        },
        maintainAspectRatio: false // Add this to prevent default height
    };


    return (
        <>
            {/* Welcome */}
            <div className={styles.WelcomeAreaContainer}>
                <div className={styles.WelcomeBackMessageContainer}>
                    <span className={styles.WelcomeBackText}>Welcome Back<br/>
                        <span style={{fontWeight: "bolder", textShadow: "4px 4px 4px rgba(0,0,0,.2)"}}>
                            {currentUser.displayName}
                        </span>
                    </span>

                </div>

                <div className={styles.ChartsContainer}>
                    <div className={styles.Chart}>
                        <Line data={winRateChartData} options={winRateChartOptions}/>

                    </div>
                    <div className={styles.Chart}>

                        <Line data={eloChartData} options={eloChartOptions}/>
                    </div>
                </div>
            </div>


        </>
    );
};
