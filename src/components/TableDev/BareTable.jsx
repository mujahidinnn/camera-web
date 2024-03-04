import { Image, Table } from "@mantine/core";
import { triggerTable } from "@stores/atoms/table";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const BareTable = ({ dataTable, columns, ...props }) => {
  const [trigger, setTrigger] = useAtom(triggerTable);
  const [data, setData] = useState(dataTable);

  useEffect(() => {
    if (trigger) {
      setData(dataTable);
      setTrigger(false);
    }
  }, [trigger, dataTable]);

  const rows =
    data?.length > 0 ? (
      Array.isArray(data) &&
      data.map((element, rowIndex) => (
        <Table.Tr key={`row-${rowIndex}`}>
          {columns.map((column, columnIndex) => (
            <Table.Td key={`col-${columnIndex}`}>
              {typeof column.body == "function"
                ? column.body({ ...element, index: rowIndex })
                : element[column.body]}
            </Table.Td>
          ))}
        </Table.Tr>
      ))
    ) : (
      <Table.Tr>
        <Table.Td colSpan={8} style={{ background: "white" }}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              style={{
                height: "300px",
                width: "300px",
              }}
              src="https://t4.ftcdn.net/jpg/04/72/65/73/360_F_472657366_6kV9ztFQ3OkIuBCkjjL8qPmqnuagktXU.jpg"
            />
          </div>
        </Table.Td>
      </Table.Tr>
    );

  return (
    <Table {...props} stickyHeader striped highlightOnHover withTableBorder>
      <Table.Thead>
        <Table.Tr>
          {columns.map((column, index) => (
            <Table.Th key={`header-${index}`}>{column.header}</Table.Th>
          ))}
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default BareTable;
