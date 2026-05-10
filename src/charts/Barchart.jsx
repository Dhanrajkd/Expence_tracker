import React, { useContext } from "react";
import { Bar } from "react-chartjs-2";
import { authcontext } from "../Context/Context";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const Barchart = () => {
    const {databar}=useContext(authcontext)
    console.log(databar)
  const weeklytotals = [0, 0, 0, 0];

  databar.forEach((item) => {

    const day = new Date(item.createdAt).getDate();
 
    if (day <= 7) {
      weeklytotals[0] += Number(item.amount);
    }

    else if (day <= 14) {
      weeklytotals[1] += Number(item.amount);
    }

    else if (day <= 21) {
      weeklytotals[2] += Number(item.amount);
    }

    else {
      weeklytotals[3] += Number(item.amount);
    }

  });
  console.log(weeklytotals)
  const bardata = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],

    datasets: [
      {
        label: "Expenses",
        data: weeklytotals,
          backgroundColor:[
       "rgba(59,130,246,0.7)",
       "rgba(16,185,129,0.7)",
       "rgba(245,158,11,0.7)",
       "rgba(239,68,68,0.7)"
     ],

     borderColor:[
       "rgba(59,130,246,1)",
       "rgba(16,185,129,1)",
       "rgba(245,158,11,1)",
       "rgba(239,68,68,1)"
     ],
        borderWidth: 1,
        borderRadius: 8
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false
  };

  return (
    <div className="w-full p-4 flex flex-col items-center justify-center bg-white rounded-lg shadow-sm">
        <h2 className=" w-full text-lg text-start font-semibold mb-4">
            Weekly Spending Trend
        </h2>
        <div className="w-[300px] min-h-[300px]">
            <Bar data={bardata} options={options} />
        </div>
    </div>
  );
};

export default Barchart;