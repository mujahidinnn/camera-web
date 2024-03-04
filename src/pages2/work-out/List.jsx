import ActionButton from "@components/ActionButton";
import BareTable from "@components/TableDev/BareTable";
import { Badge, Group, RingProgress, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getDataCodeById } from "@utils/help-func";
import { convertISODateToIndonesianFormat } from "@utils/helper";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import Edit from "./Edit";

const List = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const [rowData, setRowData] = useState(null);

  const { id } = useParams();
  const dataCode = getDataCodeById(id);

  const columns = [
    { header: "No", body: (row) => row.index + 1 },
    {
      header: "Date",
      body: (row) => convertISODateToIndonesianFormat(row.day),
    },
    {
      header: "Progress",
      body: (row) => (
        <RingProgress
          size={50}
          thickness={4}
          sections={[{ value: row.progress, color: "blue" }]}
          label={
            <Text c="blue" ta="center">
              {row.progress}
            </Text>
          }
        />
      ),
    },
    {
      header: "Status",
      body: (row) =>
        row.status == "DONE" ? (
          <Badge color="green">DONE</Badge>
        ) : (
          <Badge color="red">NOT</Badge>
        ),
    },
    {
      header: "Action",
      body: (data) => (
        <ActionButton
          label="Edit"
          icon={<FiEdit />}
          onClick={() => {
            open();
            setRowData(data);
          }}
          color="yellow"
        />
      ),
    },
    ,
  ];

  return (
    <>
      <Group display="flex" justify="space-between" mb={24}>
        <Text size="lg" style={{ display: "flex", alignItems: "center" }}>
          <IoChevronBackOutline
            onClick={() => navigate(`/codes/`)}
            style={{ cursor: "pointer" }}
          />
          Work Out List {dataCode.code}
        </Text>
      </Group>

      <BareTable dataTable={dataCode.work_out_data} columns={columns} />

      <Edit opened={opened} close={close} data={rowData} />
    </>
  );
};

export default List;
