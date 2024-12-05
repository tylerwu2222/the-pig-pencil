'use client'
// import * as d3 from 'd3';
import './recharts.css'

import React, { useState, useEffect } from 'react';
import { LineChart, Line, Label, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

// import data2 from '../data/mini_scores_c_wide.csv';
import { loadPublicCSV } from '@/app/lib/data_section/loadPublicCSV';

// import DropdownMenu from '../../../../components/Modules/DropdownMenu/DropdownMenu';
import DropdownInputSelect from '@/app/components/inputs/DropdownInput/DropdownInputSelect';


import { colors } from './config';

const cumulative_stats = ['_sum', '_mean', '_median', '_max', '_min'];

export default function Basic2({ data }) {

    const [currentCumulativeStat, setCurrentCumulativeStat] = useState(cumulative_stats[0]);
    const [yDomain, setYDomain] = useState([0, 500]);
    const [wideData, setWideData] = useState([]);

    // load data
    useEffect(() => {
        // d3.csv(data2)
        async function fetchData() {
            loadPublicCSV({ fileName: '2023-05-23-visualizing-nyt-mini-crossword-completion-times_c_wide' })
                .then(dta => {
                    setWideData(dta);
                    // console.log('wide', dta);
                });
        }
        fetchData();
    }, []);



    useEffect(() => {
        if (currentCumulativeStat == '_mean') {
            // console.log('meameaern');
            setYDomain([0, 500]);
        }
    }, [currentCumulativeStat]);

    return (<>
        <DropdownInputSelect
            label='Cumulative stat'
            options={cumulative_stats}
            initialOption={currentCumulativeStat}
            selectedOption={currentCumulativeStat}
            setSelectedOption={setCurrentCumulativeStat}
        />
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
            <YAxis domain={yDomain}>
                <Label className='rechartsYlabel' value={"Cumulative " + currentCumulativeStat.slice(1).charAt(0).toUpperCase() + currentCumulativeStat.slice(2) + " Completion Time (sec)"} position="insideLeft" angle={-90} />
            </YAxis>
            <Tooltip />
            <Line type="monotone" dataKey={"a" + currentCumulativeStat} stroke={colors['userA']} dot={false} />
            <Line type="monotone" dataKey={"b" + currentCumulativeStat} stroke={colors['userB']} dot={false} />
            <Line type="monotone" dataKey={"c" + currentCumulativeStat} stroke={colors['userC']} dot={false} />
            <Line type="monotone" dataKey={"d" + currentCumulativeStat} stroke={colors['userD']} dot={false} />
            <Line type="monotone" dataKey={"e" + currentCumulativeStat} stroke={colors['userE']} dot={false} />
        </LineChart>
    </>
    )
}
