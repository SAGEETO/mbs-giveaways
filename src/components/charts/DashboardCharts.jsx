import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

function DashboardCharts({ stats }) {
  const barData = {
    labels: [
      "Giveaways",
      "Applications",
      "Users",
      "Winners",
    ],
    datasets: [
      {
        label: "Platform Statistics",
        data: [
          stats.giveaways,
          stats.applications,
          stats.users,
          stats.winners,
        ],
      },
    ],
  };

  const doughnutData = {
    labels: [
      "Giveaways",
      "Applications",
      "Users",
      "Winners",
    ],
    datasets: [
      {
        data: [
          stats.giveaways,
          stats.applications,
          stats.users,
          stats.winners,
        ],
      },
    ],
  };

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">

    {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Platform Overview
        </h2>

        <Bar
          data={barData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
            },
          }}
        />

      </div>
      {/* Doughnut Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-green-800 mb-6">
          Platform Distribution
        </h2>

        <div className="max-w-sm mx-auto">
          <Doughnut
            data={doughnutData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />
        </div>

      </div>
      </div>
  );
}

export default DashboardCharts;