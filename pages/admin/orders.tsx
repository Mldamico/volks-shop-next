import React from "react";
import { AdminLayout } from "../../components/layouts";
import { IoTicketSharp } from "react-icons/io5";
const OrdersPage = () => {
  return (
    <AdminLayout
      title="Orders"
      subtitle="Orders Management"
      icon={<IoTicketSharp />}
    >
      <div></div>
    </AdminLayout>
  );
};

export default OrdersPage;
