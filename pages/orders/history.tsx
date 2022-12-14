import React from "react";
import { ShopLayout } from "../../components/layouts";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Link from "next/link";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { dbOrders } from "../../database";
import { IOrder } from "../../interfaces/order";
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
      return <Link href={`/orders/${props.data.orderId}`}>See Order</Link>;
    },
  },
];

interface Props {
  orders: IOrder[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rowData = orders.map((order, i) => ({
    id: i + 1,
    pais: order.isPaid,
    fullName: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
    orderId: order._id,
  }));
  return (
    <ShopLayout title="Order History" pageDescription="Order history">
      <h1 className="text-4xl">Order History</h1>

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session: any = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login?p=/orders/history",
        permanent: false,
      },
    };
  }

  const orders = await dbOrders.getOrdersByUser(session.user._id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
