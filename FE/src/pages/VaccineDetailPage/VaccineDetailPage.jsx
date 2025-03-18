
import { useParams } from "react-router-dom";
import VaccineDetail from "../../components/VaccineDetail/VaccineDetail";

const VaccineDetailPage = () => {
  const { id } = useParams();

  return (
    <div>
      <VaccineDetail id={id} />
    </div>
  );
};

export default VaccineDetailPage;
