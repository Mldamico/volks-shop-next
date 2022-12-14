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
import { useState, useEffect } from "react";

const UsersPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/users");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <></>;

  const onRoleUpdated = async (userId: string, newRole: string) => {
    const prevUsers = users.map((user) => ({ ...user }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user._id ? newRole : user.role,
    }));
    setUsers(updatedUsers as IUser[]);
    try {
      await volksApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(prevUsers);
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

  const rowData = users.map((user) => ({
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
