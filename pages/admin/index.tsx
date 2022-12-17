import React from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import {
  MdOutlineDashboardCustomize,
  MdOutlineAttachMoney,
  MdOutlineCreditCardOff,
  MdOutlineCategory,
  MdOutlineCancelPresentation,
  MdOutlineProductionQuantityLimits,
  MdOutlineAccessTime,
} from "react-icons/md";
import { AiOutlineCreditCard, AiOutlineUsergroupDelete } from "react-icons/ai";
import { SummaryTile } from "../../components/admin";
import useSWR from "swr";
import { DashboardSummaryResponse } from "../../interfaces";
import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [refreshIn, setRefreshIn] = useState(30);
  const { data, error } = useSWR<DashboardSummaryResponse>(
    "/api/admin/dashboard",
    {
      refreshInterval: 30 * 1000,
    }
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshIn((prevState) => (prevState > 0 ? prevState - 1 : 30));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!error && !data) {
    return <></>;
  }

  if (error) {
    console.log(error);
    return <p>Error Loading Dashboard</p>;
  }

  const {
    numberOfOrders,
    paidOrders,
    numberOfClients,
    numberOfProducts,
    productsWithNoInventary,
    lowInventary,
    notPaidOrders,
  } = data!;
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Stadistics"
      icon={<MdOutlineDashboardCustomize size={36} />}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <SummaryTile
          icon={<AiOutlineCreditCard size={40} />}
          title={numberOfOrders}
          subtitle="Total Order"
        />
        <SummaryTile
          icon={<MdOutlineAttachMoney size={40} color="green" />}
          title={paidOrders}
          subtitle="Paid Orders"
        />
        <SummaryTile
          icon={<MdOutlineCreditCardOff size={40} color="red" />}
          title={notPaidOrders}
          subtitle="Pending Orders"
        />
        <SummaryTile
          icon={<AiOutlineUsergroupDelete size={40} />}
          title={numberOfClients}
          subtitle="Clients"
        />
        <SummaryTile
          icon={<MdOutlineCategory size={40} color="orange" />}
          title={numberOfProducts}
          subtitle="Products"
        />
        <SummaryTile
          icon={<MdOutlineCancelPresentation size={40} color="red" />}
          title={productsWithNoInventary}
          subtitle="Out of Stock"
        />
        <SummaryTile
          icon={<MdOutlineProductionQuantityLimits size={40} color="orange" />}
          title={lowInventary}
          subtitle="Low Stock"
        />
        <SummaryTile
          icon={<MdOutlineAccessTime size={40} color="blue" />}
          title={refreshIn}
          subtitle="Refresh in: "
        />
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
