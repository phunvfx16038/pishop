import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
const LineGraph = ({ datasets, labels }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const data = {
    labels,
    datasets,
  };
  return (
    <div style={{ margin: "20px auto" }}>
      <Line data={data} />
    </div>
  );
};

export default LineGraph;
