import React from "react";
import { AdminLayout } from "../../components/layouts";
import { IoTicketSharp } from "react-icons/io5";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useSWR from "swr";
import { IOrder, IUser } from "../../interfaces";
const columnDefs = [
  { headerName: "Order ID", field: "id", width: 250 },
  { headerName: "Email", field: "email", width: 250 },
  { headerName: "Full Name", field: "name", width: 200 },
  { headerName: "Total", field: "total", width: 100 },
  {
    headerName: "Paid",
    field: "paid",
    width: 150,
    cellRenderer: (props: any) => {
      return props.value ? <div>Pagado </div> : <div>No Pagado</div>;
    },
  },
  { headerName: "Stock", field: "inStock", align: "center", width: 50 },
  {
    headerName: "See Order",
    field: "check",
    width: 150,
    cellRenderer: (props: any) => {
      return (
        <a
          href={`/admin/orders/${props.data.id}`}
          target="_blank"
          rel="noreferrer"
        >
          See Order
        </a>
      );
    },
  },
  { headerName: "Created At", field: "createdAt", width: 250 },
];

const OrdersPage = () => {
  const { data, error } = useSWR<IOrder[]>("/api/admin/orders");

  if (!data && !error) return <></>;

  const rowData = data!.map((order) => ({
    id: order._id,
    email: (order.user as IUser).email,
    name: (order.user as IUser).name,
    total: order.total,
    isPaid: order.isPaid,
    inStock: order.numberOfItems,
    createdAt: order.createdAt,
  }));
  return (
    <AdminLayout
      title="Orders"
      subtitle="Orders Management"
      icon={<IoTicketSharp />}
    >
      <div
        style={{
          width: 1400,
          height: 300,
        }}
        className="mx-auto ag-theme-alpine"
      >
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    </AdminLayout>
  );
};

export default OrdersPage;
