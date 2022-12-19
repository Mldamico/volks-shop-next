import React from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { MdPeopleOutline } from "react-icons/md";
import { AgGridReact } from "ag-grid-react";
import Link from "next/link";
import useSWR from "swr";
import { IUser } from "../../interfaces";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { volksApi } from "../../api";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  if (!data && !error) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {
    try {
      await volksApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      console.log(error);
    }
  };

  const columnDefs = [
    { headerName: "Email", field: "email", width: 250 },
    { headerName: "Full Name", field: "name", width: 250 },
    {
      headerName: "Role",
      field: "role",
      width: 200,
      cellRenderer: (props: any) => {
        console.log(props);
        return (
          <select
            value={props.data.role}
            className="w-[100px]"
            onChange={({ target }) =>
              onRoleUpdated(props.data.id, target.value)
            }
          >
            <option value="admin">Admin</option>
            <option value="client">Client</option>
            <option value="super-user">Super-User</option>
            <option value="SEO">SEO</option>
          </select>
        );
      },
    },
  ];

  const rowData = data!.map((user) => ({
    id: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));
  return (
    <AdminLayout
      title="Users"
      subtitle="Users Maintenance"
      icon={<MdPeopleOutline />}
    >
      <div
        style={{
          width: 700,
          height: 300,
        }}
        className="mx-auto ag-theme-alpine"
      >
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    </AdminLayout>
  );
};

export default UsersPage;
