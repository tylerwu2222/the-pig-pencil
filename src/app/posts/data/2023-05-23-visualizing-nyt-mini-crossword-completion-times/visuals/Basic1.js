import * as d3 from 'd3';

import React, { useState, useEffect } from 'react';
import { LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import data2 from '../data/mini_scores_c_wide.csv';

import { colors } from './config';
// import { NYTContext } from '../2023-05-23-visualizing-nyt-mini-crossword-completion-times';

export default function Basic1() {
    const [wideData, setWideData] = useState([]);

    // load data
    useEffect(() => {
        d3.csv(data2)
            .then(dta => {
                setWideData(dta);
                // console.log('wide', dta);
            });
    }, []);


    return (<>
        <LineChart
            width={800}
            height={400}
            data={wideData}
            margin={{
                top: 100,
                right: 30,
                left: 20,
                bottom: 20,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date">
                <Label value="Date" position="insideBottom" offset={-10} />
            </XAxis>
            <YAxis domain={[0, 500]}>
                <Label value="Completion Time (sec)" position="insideLeft" angle={-90} />
            </YAxis>
            <Tooltip />
            <Line type="monotone" dataKey="a" stroke={colors['userA']} dot={false} />
            <Line type="monotone" dataKey="b" stroke={colors['userB']} dot={false} />
            <Line type="monotone" dataKey="c" stroke={colors['userC']} dot={false} />
            <Line type="monotone" dataKey="d" stroke={colors['userD']} dot={false} />
            <Line type="monotone" dataKey="e" stroke={colors['userE']} dot={false} />
        </LineChart>
    </>
    )
}