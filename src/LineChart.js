import { format, } from 'date-fns'
import React, { Component } from 'react'
import Chart from "chart.js";
let myLineChart;

const formatLabels = (data) => {
  // for some reason before the data from api it has [{}] in place
  if (Object.keys(data[0]).length) {
    return data.map(d => format(d.date, "MM/dd"))
  } else {
    return []
  }
}
export default class LineGraph extends Component {
  chartRef = React.createRef();
  
  componentDidMount() {
    this.buildChart();
  }
  
  componentDidUpdate() {
    this.buildChart();
  }
  
  buildChart = () => {
    const myChartRef = this.chartRef.current.getContext("2d");
    const { data, average, labels } = this.props;
    if (typeof myLineChart !== "undefined") myLineChart.destroy();
    myLineChart = new Chart(myChartRef, {
      type: "line",
      data: {
        //Bring in data
        // labels: data.map(d => format(d.date,"MM/dd")),
        labels: formatLabels(data),
        datasets: [
          {
            label: "חולים",
            data: data.map(d => d.sick),
            fill: false,
            borderColor: "#6610f2"
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio:1.5,
        layout: {
          padding: {
            top: 5,
            left: 15,
            right: 15,
            bottom: 15
          }
        }
        
      }
    });
  }
  
  render() {
    return (
      <div className="main-chart">
        <canvas
          id="myChart"
          ref={this.chartRef}
        />
      </div>
    )
  }
}