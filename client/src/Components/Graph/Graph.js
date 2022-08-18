import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default class Graph extends React.Component {
  componentDidMount() {}
  render() {
    const options = {
      responsive: false,
      plugins: {
        legend: {
          display: false,
          position: "bottom",
        },
        title: {
          display: false,
          text: "Activity Graph",
        },
      },
    };

    const labels = Array.apply(null, { length: 27 }).map(Number.call, Number);

    const data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() => Math.floor(Math.random() * 999)),
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    };
    return <Bar options={options} data={data} />;
  }
}

export class LineGraph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend
    );

    const options = {
      scales: {
        yAxis: {
          display: false
        },
        xAxis: {
          display: false
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: "top",
          display: false,
        },
        title: {
          display: false,
          text: "Chart.js Line Chart",
        },
      },
    };

    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
    ];

    const data = {
      labels,
      datasets: [
        {
          label: "Dataset 1",
          data: labels.map(() => Math.floor(Math.random() * 999)),
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: labels.map(() => Math.floor(Math.random() * 999)),
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    };

    return <Line options={options} data={data} />;
  }
}
