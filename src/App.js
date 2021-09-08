import DatePicker from "react-datepicker";
import { useState } from "react";
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
  d.setDate(d.getDate() - 10)
  return new Date(d)
}

function App() {
  const [startDate, setStartDate] = useState(getDateOfTenDaysBefore());
  const [endDate, setEndDate] = useState(new Date());

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
        <button className="btn">Render</button>
      </div>
      <div className="graph">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default App;
