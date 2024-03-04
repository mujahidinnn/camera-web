import React from "react";
import TableDev from "../../components/TableDev";
import { Switch } from "@mantine/core";

const List = () => {
  const columns = [
    { header: "Nama", body: "nama" },
    { header: "Email", body: "email" },
    { header: "Status", body: "status_pegawai" },
    { header: "Nomor Identitas", body: "nomor_identitas" },
    { header: "Aktif", body: (data) => <Switch checked={data.is_aktif} /> },
    ,
  ];

  return <TableDev url="/pegawai/" columns={columns} />;
};

export default List;
