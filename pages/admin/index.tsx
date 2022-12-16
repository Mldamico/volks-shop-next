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

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Stadistics"
      icon={<MdOutlineDashboardCustomize size={36} />}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-4">
        <SummaryTile
          icon={<AiOutlineCreditCard size={40} />}
          title="3"
          subtitle="Total Order"
        />
        <SummaryTile
          icon={<MdOutlineAttachMoney size={40} color="green" />}
          title="2"
          subtitle="Paid Orders"
        />
        <SummaryTile
          icon={<MdOutlineCreditCardOff size={40} color="red" />}
          title="1"
          subtitle="Pending Orders"
        />
        <SummaryTile
          icon={<AiOutlineUsergroupDelete size={40} />}
          title="4"
          subtitle="Clients"
        />
        <SummaryTile
          icon={<MdOutlineCategory size={40} color="orange" />}
          title="4"
          subtitle="Products"
        />
        <SummaryTile
          icon={<MdOutlineCancelPresentation size={40} color="red" />}
          title="4"
          subtitle="Out of Stock"
        />
        <SummaryTile
          icon={<MdOutlineProductionQuantityLimits size={40} color="orange" />}
          title="4"
          subtitle="Low Stock"
        />
        <SummaryTile
          icon={<MdOutlineAccessTime size={40} color="blue" />}
          title="4"
          subtitle="Refresh in: "
        />
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
