import { useState } from "react";
import data from "../../db.json";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

const DataTable = () => {
  const navigate = useNavigate();
  const [datatable, setDatatable] = useState(data);

  // Define a function to generate unique IDs for rows based on the index
  const getRowId = (row) => row.obu_id;

  const obuIdFormatter = (obuId) => {
    return obuId.slice(0, 4) + "x".repeat(Math.max(0, obuId.length - 4));
  };

  const columns = [
    {
      field: "obu_id",
      headerName: "Vechile ID",
      width: 300,
      valueGetter: (params) => obuIdFormatter(params.row.obu_id),
    },
    { field: "total_distance", headerName: "Total Distance", width: 300 },
    { field: "total_price", headerName: "Invoice", width: 300 },
  ];

  const handleRowClick = (params) => {
    const { id } = params;
    navigate(`/${id}`);
  };

  return (
    <div style={{ width: "100%" }}>
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
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[10]}
        getRowId={getRowId}
        onRowClick={handleRowClick}
      />
    </div>
  );
};

export default DataTable;
