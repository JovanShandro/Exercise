import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["1", "2", "3", "4", "5", "6"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: "rgb(255, 99, 132)",
      borderColor: "rgba(255, 99, 132, 0.2)",
    },
  ],
};

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const getDateOfTenDaysBefore = () => {
  const d = new Date();
  d.setDate(d.getDate() - 10);
  return new Date(d);
};

const formatDate = (date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0];
};

function App() {
  const [startDate, setStartDate] = useState(getDateOfTenDaysBefore());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    const resp = await fetch(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${formatDate(
        startDate
      )}&end=${formatDate(endDate)}&index=[USD]`
    );
    const data = await resp.json();
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="form">
        <DatePicker
          selected={startDate}
          dateFormat="yyyy-mm-dd"
          onChange={(date) => setStartDate(date)}
        />
        <DatePicker
          selected={endDate}
          dateFormat="yyyy-mm-dd"
          onChange={(date) => setEndDate(date)}
        />
        <button className="btn" onClick={fetchData}>
          Render
        </button>
      </div>
      <div className="graph">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default App;
