import { Table } from "@mantine/core";
import React, { Fragment, useEffect, useState } from "react";
import { request } from "../../utils/request";

const TableDev = ({ url, tableQuery, columns, responseMapper, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [url, tableQuery]);

  async function getData() {
    try {
      setLoading(true);
      const resp = await request.get(buildDataUrl());
      setData(resp.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  function buildDataUrl() {
    let dataUrl = url || "";

    if (tableQuery) {
      const queryParams = Object.entries(tableQuery)
        .map(([key, value]) => `${key}=${value}`)
        .join("&");

      dataUrl += `?${queryParams}`;
    }

    return dataUrl;
  }

  const dataTable = loading
    ? []
    : responseMapper
    ? responseMapper(data)
    : data || [];

  const rows =
    Array.isArray(dataTable) &&
    dataTable.map((element, rowIndex) => (
      <Table.Tr key={`row-${rowIndex}`}>
        {columns.map((column, columnIndex) => (
          <Table.Td key={`col-${columnIndex}`}>
            {typeof column.body == "function"
              ? column.body(element)
              : element[column.body]}
          </Table.Td>
        ))}
      </Table.Tr>
    ));

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

export default TableDev;
