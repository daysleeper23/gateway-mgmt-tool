import { useParams } from "react-router";

const StatisticsView = () => {
  const uuid = useParams<{ uuid: string }>().uuid;

  return (
    <div>
      <h1>Gateway Statistics - {uuid}</h1>
    </div>
  )
};
export default StatisticsView;