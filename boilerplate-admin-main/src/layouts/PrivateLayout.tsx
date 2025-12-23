import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/shared/utils/routes";
import DashboardLayout from '@/components/DashboardLayout';

const PrivateLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(location.pathname);

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location.pathname]);

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    navigate(page);
  };

  return (
    <DashboardLayout currentPage={currentPage} onPageChange={handlePageChange}>
      <Outlet />
    </DashboardLayout>
  );
};

export default PrivateLayout;
