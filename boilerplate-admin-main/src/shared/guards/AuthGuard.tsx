import { Navigate } from "react-router-dom";
import { getData } from "@/shared/utils/helper";
import { ROUTES } from "@/shared/utils/routes";
import { CONSTANT } from "@/shared/utils/constant";

const AuthGuard = ({ element }) => {
  const Component = element;
  const token = getData(CONSTANT.ACCESS_TOKEN);

  return !token ? <Navigate to={ROUTES.login} /> : <Component />;
};

export default AuthGuard;
