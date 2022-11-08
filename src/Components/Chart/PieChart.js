import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
const PieChart = ({ labels, datasets }) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels,
    datasets,
  };
  return (
    <div style={{ width: "380px", margin: "20px auto" }}>
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
