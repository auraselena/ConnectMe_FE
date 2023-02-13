import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  if (location.pathname.includes("login") || location.pathname.includes("register")) {
    navigate("/", { replace: true });
  }
  return <></>;
};
