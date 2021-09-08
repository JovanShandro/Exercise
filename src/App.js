import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
    },
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
  const [graphData, setGraphData] = useState({});

  const fetchData = async () => {
    const resp = await fetch(
      `https://api.coindesk.com/v1/bpi/historical/close.json?start=${formatDate(
        startDate
      )}&end=${formatDate(endDate)}&index=[USD]`
    );
    const { bpi } = await resp.json();

    setGraphData({
      labels: Object.keys(bpi),
      datasets: [
        {
          data: Object.values(bpi),
          fill: false,
          backgroundColor: "blue",
          borderColor: "blue",
        },
      ],
    });
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
        <Line data={graphData} options={options} />
      </div>
    </div>
  );
}

export default App;
