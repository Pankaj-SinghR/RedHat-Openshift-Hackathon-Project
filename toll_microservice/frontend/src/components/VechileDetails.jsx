import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

const VechileDetails = () => {
  const { id } = useParams();
  const [vechileData, setVechileData] = useState([]);

  // Define a function to generate unique IDs for rows based on the index
  const getRowId = (row) => row.obu_id;

  const columns = [
    {
      field: "obu_id",
      headerName: "Vechile ID",
      width: 300,
    },
    { field: "start_lat", headerName: "Start Latitude", width: 190 },
    { field: "dest_lat", headerName: "Dest. Latitude", width: 190 },
    { field: "start_long", headerName: "Start Longitude", width: 190 },
    { field: "dest_long", headerName: "Dest. Longitude", width: 190 },
    { field: "created_at", headerName: "Starting Time", width: 190 },
    { field: "updated_at", headerName: "Ending Time", width: 190 },
    { field: "total_distance", headerName: "Total Distance", width: 190 },
    { field: "total_price", headerName: "Total Price", width: 190 },
  ];

  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          paddingBottom: 20,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        Vechile Detail
      </div>
      <DataGrid
        rows={vechileData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 10]}
        getRowId={getRowId}
      />
    </div>
  );
};

export default VechileDetails;
