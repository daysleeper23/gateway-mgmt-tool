import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

const NotFoundView = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-1 h-full w-full gap-4 items-center justify-center bg-gray-50">
      <div className="text-sm text-primary/75">Gateway not found.</div>
      <Button size="sm" onClick={() => navigate("/")}>
        Go back
      </Button>
    </div>
  );
};
export default NotFoundView;
