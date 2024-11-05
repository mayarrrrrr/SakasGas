import './card.css'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Chart from 'react-apexcharts'
import {UilTimes} from '@iconscout/react-unicons'


function Card(props){

    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div layout>
            {expanded ? <ExpandedCard param={props} setExpanded={() => setExpanded(false)}/> : <CompactCard param={props} setExpanded={() => setExpanded(true)}/>}
        </motion.div>
    )
}


// Compact card 
function CompactCard ({param, setExpanded}) {
    const Png = param.png;

    return (
        <motion.div className="compact-card" 
            style={{
            background : param.color.backGround,
            boxShadow : param.color.boxShadow
            }}
            onClick={setExpanded}
            LayoutId='expandableCard'>
            <div className="radialBar">
                <CircularProgressbar 
                value={param.barValue }
                text={`${param.barValue }%`}/>
                <span>{param.title}</span>
            </div>
            <div className="detail">
                <Png/>
                <span className='hidden-span'>${param.value}</span>
                <span className='hidden-span'>Last 24 hours</span>

            </div>
        </motion.div>
    )
}


// Expanded Card
function ExpandedCard({param, setExpanded}){

    const data = {
        options: {
          chart: {
            type: "area",
            height: "auto",
          },
    
          dropShadow: {
            enabled: false,
            enabledOnSeries: undefined,
            top: 0,
            left: 0,
            blur: 3,
            color: "#000",
            opacity: 0.35,
          },
    
          fill: {
            colors: ["#fff"],
            type: "gradient",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
            colors: ["white"],
          },
          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          grid: {
            show: true,
          },
          xaxis: {
            type: "datetime",
            categories: [
              "2024-04-19T00:00:00.000Z",
              "2024-04-19T01:30:00.000Z",
              "2024-04-19T02:30:00.000Z",
              "2024-04-19T03:30:00.000Z",
              "2024-04-19T04:30:00.000Z",
              "2024-04-19T05:30:00.000Z",
              "2024-04-19T06:30:00.000Z",
            ],
          },
        },
      };
      
    return(
        <motion.div className='expanded-card' 
        style={{
            background : param.color.backGround,
            boxShadow : param.color.boxShadow
            }}
            LayoutId='expandableCard'>
                <div style={{alignSelf:'flex', cursor:'pointer', color:'white'}}>
                    <UilTimes onClick={setExpanded}/>
                </div>
                <span>{param.title}</span>
                <div className="chart-container">
                    <Chart series={param.series} type='area' options={data.options}/>
                </div>
                <span>Last 24 hours</span>
            
        </motion.div>
    )

}

export default Card