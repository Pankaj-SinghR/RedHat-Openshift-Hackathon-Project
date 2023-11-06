import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { getData, url } from "../network";
import { useQuery } from "@tanstack/react-query";
import VechileDialog from "./VechileDialog";
import Loader from "./Loader";

const DataTable = () => {
  const [datatable, setDatatable] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  // Define a function to generate unique IDs for rows based on the index
  const getRowId = (row) => row.obu_id;

  const obuIdFormatter = (obuId) => {
    return obuId.slice(0, 4) + "x".repeat(Math.max(0, obuId.length - 4));
  };

  const columns = [
    {
      field: "obu_id",
      headerName: "Vechile ID",
      width: 400,
      valueGetter: (params) => obuIdFormatter(params.row.obu_id),
    },
    {
      field: "total_distance",
      headerName: "Total Distance (km)",
      width: 300,
      valueFormatter: (params) => params.value.toFixed(2),
    },
    {
      field: "total_price",
      headerName: "Invoice ($)",
      width: 300,
      valueFormatter: (params) => params.value.toFixed(2),
    },
  ];

  const handleRowClick = (params) => {
    setSelectedRowData(params.row);
    setOpen(true);
  };

  const devicesQuery = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const response = await getData(`${url}/invoice/api/v1/obu/`);
      const allDevices = await response?.data?.obu_data;
      setDatatable(allDevices);
      return response;
    },
    staleTime: 5 * 1000,
  });

  useEffect(() => {
    devicesQuery.refetch();
  }, []);

  if (devicesQuery.isLoading) return <Loader />;
  if (devicesQuery.isError) return <div>Error...</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          paddingBottom: 20,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        All Vechile Details
      </div>

      <DataGrid
        rows={datatable}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        getRowId={getRowId}
        onRowClick={handleRowClick}
      />

      <VechileDialog open={open} setOpen={setOpen} rowData={selectedRowData} />
    </div>
  );
};

export default DataTable;
