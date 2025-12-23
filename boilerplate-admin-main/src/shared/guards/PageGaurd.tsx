import { Navigate } from "react-router-dom";
import { ROUTES } from "@/shared/utils/routes";
import { CONSTANT } from "@/shared/utils/constant";
import { getData } from "@/shared/utils/helper";

const PageGaurd = ({ element }) => {
  const Component = element;
  const token = getData(CONSTANT.ACCESS_TOKEN);

  return token ? <Navigate to={ROUTES.userList} /> : <Component />;
};

export default PageGaurd;
