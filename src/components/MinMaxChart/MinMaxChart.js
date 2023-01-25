import React from 'react';
import Chart from 'react-apexcharts';
import { useState } from 'react';
import { useEffect } from 'react';

function MinMaxChart({ forecastData, formatForecastDate }) {
  const HIGH = 'High';
  const LOW = 'Low';

  const [series, setSeries] = useState([
    {
      name: HIGH,
      data: [],
    },
    {
      name: LOW,
      data: [],
    },
  ]);
  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'line',
      dropShadow: {
        enabled: true,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    colors: ['#ffdd3e', '#308ae4'],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: 'smooth',
    },
    title: {
      text: 'Forecast High & Low Temperature change',
      align: 'left',
    },
    grid: {
      borderColor: '#e7e7e7',
      row: {
        colors: ['#f3f3f3', '#ffffff'], // takes an array which will be repeated on columns
        opacity: 0.8,
      },
    },
    markers: {
      size: 1,
    },
    xaxis: {
      categories: [],
      title: {
        text: 'Date',
      },
    },
    yaxis: {
      title: {
        text: 'Temperature',
      },
      min: -50,
      max: 50,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
  });

  useEffect(() => {
    const maxTemps = forecastData.map(el => Math.round(el.temp.max));
    const minTemps = forecastData.map(el => Math.round(el.temp.min));
    const dates = forecastData.map(el => formatForecastDate(el.dt));
    const newSeries = series.map(obj => {
      if (obj.name === HIGH) return { ...obj, data: [...maxTemps] };
      if (obj.name === LOW) return { ...obj, data: [...minTemps] };
      return obj;
    });
    options.xaxis.categories.push(...dates);
    setOptions({ ...options, categories: [...dates] });
    setSeries(newSeries);
  }, [forecastData]);

  return (
    <div id="chart">
      <Chart options={options} series={series} type="line" height={450} />
    </div>
  );
}

export default MinMaxChart;
