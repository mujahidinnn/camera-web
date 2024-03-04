import ActionButton from "@components/ActionButton";
import BareTable from "@components/TableDev/BareTable";
import { useStateOps } from "@hooks/useStateOps";
import { Group, Text } from "@mantine/core";
import { triggerTable } from "@stores/atoms/table";
import { dataTableCodes, deleteDataTableCodes } from "@utils/help-func";
import { useSetAtom } from "jotai";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Add from "./Add";
import Delete from "./Delete";
import Edit from "./Edit";

const List = () => {
  const setTriggerTable = useSetAtom(triggerTable);
  function handleTrigger() {
    setTriggerTable(true);
  }
  const editOps = useStateOps();
  const deleteOps = useStateOps();

  const navigate = useNavigate();

  const columns = [
    { header: "No", body: (row) => row.index + 1 },
    { header: "Program Code", body: "code" },
    {
      header: "Action",
      body: (row) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <ActionButton
            label="Folder"
            icon={<FaRegFolderOpen />}
            onClick={() => navigate(`/codes/work-out/${row.id}`)}
          />
          <ActionButton
            label="Edit"
            icon={<FiEdit />}
            onClick={() => editOps.handleShow(row)}
            color="yellow"
          />
          <ActionButton
            label="Delete"
            icon={<MdDeleteForever />}
            onClick={() => deleteOps.handleShow(row)}
            color="red"
          />
        </div>
      ),
    },
    ,
  ];

  return (
    <>
      <Group display="flex" justify="space-between" mb={24}>
        <Text size="lg">Work Out List</Text>

        <Add />
      </Group>

      <BareTable dataTable={dataTableCodes} columns={columns} />

      <Edit
        opened={editOps.state.show}
        close={editOps.handleClose}
        data={editOps.state.data}
      />

      <Delete
        handleDelete={() => {
          deleteDataTableCodes(deleteOps.state.data.id);
          deleteOps.handleClose();
          handleTrigger();
        }}
        close={deleteOps.handleClose}
        opened={deleteOps.state.show}
      />
    </>
  );
};

export default List;
