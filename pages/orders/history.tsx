import React from "react";
import { ShopLayout } from "../../components/layouts";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";

const columnDefs = [
  { headerName: "ID", field: "id", width: 100 },
  { headerName: "Full Name", field: "fullName", width: 300 },
  {
    headerName: "Paid",
    field: "paid",
    width: 200,
    cellRenderer: (props: any) => {
      return props.value ? <div>Pagado </div> : <div>No Pagado</div>;
    },
  },
  {
    headerName: "Order",
    field: "order",
    cellRenderer: (props: any) => {
      return <Link href={`/orders/${props.data.id}`}>See Order</Link>;
    },
  },
];

const rowData = [
  { id: "1", paid: true, fullName: "Juan Perez" },
  { id: "2", paid: false, fullName: "Ramiro Puentes" },
  { id: "3", paid: true, fullName: "Eduardo Ramones" },
  { id: "4", paid: false, fullName: "Santiago Perez" },
  { id: "5", paid: false, fullName: "Juana Landa" },
  { id: "6", paid: true, fullName: "Carolina Peralta" },
  { id: "7", paid: true, fullName: "Agustina Tenera" },
  { id: "8", paid: false, fullName: "Carla Ramallo" },
];
const HistoryPage = () => {
  return (
    <ShopLayout title="Order History" pageDescription="Order history">
      <h1>Order History</h1>

      <div
        style={{
          width: 800,
          height: 300,
        }}
        className="mx-auto ag-theme-alpine"
      >
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    </ShopLayout>
  );
};

export default HistoryPage;
