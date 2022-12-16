import React from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { MdOutlineDashboardCustomize } from "react-icons/md";
const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Stadistics"
      icon={<MdOutlineDashboardCustomize size={36} />}
    >
      <div>Something</div>
    </AdminLayout>
  );
};

export default DashboardPage;
