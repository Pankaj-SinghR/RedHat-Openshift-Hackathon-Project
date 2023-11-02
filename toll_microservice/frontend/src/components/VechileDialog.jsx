import { forwardRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import jsPDF from "jspdf";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VechileDialog = ({ open, setOpen, rowData }) => {
  const handleClose = () => {
    setOpen(false);
  };

  const getTime = (milliseconds) => {
    // Create a Date object from the timestamp
    const date = new Date(milliseconds);

    // Extract hours, minutes, and seconds from the Date object
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Format the time as "hr:min:sec"
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return formattedTime;
  };

  const downloadAsPDF = () => {
    if (rowData) {
      const doc = new jsPDF();

      // Set font size and style
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");

      // Set text color
      doc.setTextColor(0, 0, 0);

      // Add a title
      doc.setFontSize(18);
      doc.text("Vehicle Details", 105, 10, "center");

      // Add data with formatting
      doc.setFontSize(12);
      doc.text(`Vehicle ID: ${rowData.obu_id}`, 10, 30);
      doc.text(`Starting Latitude: ${rowData.start_lat}`, 10, 40);
      doc.text(`Ending Latitude: ${rowData.dest_lat}`, 10, 50);
      doc.text(`Starting Longitude: ${rowData.start_long}`, 10, 60);
      doc.text(`Ending Longitude: ${rowData.dest_lat}`, 10, 70);
      doc.text(`Created At: ${getTime(rowData.created_at)}`, 10, 80);
      doc.text(`Updated At: ${getTime(rowData.updated_at)}`, 10, 90);
      doc.text(
        `Total Distance Covered: ${rowData.total_distance.toFixed(2)}`,
        10,
        100
      );
      doc.text(`Total Price: $${rowData.total_price.toFixed(2)}`, 10, 110);

      // Save the PDF with a custom name
      doc.save("vehicle_details.pdf");
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Vehicle Details</DialogTitle>
        <DialogContent>
          {/* {rowData && (
            <div>
              <p>
                <strong>Vehicle ID:</strong> {rowData.obu_id}
              </p>
              <p>
                <strong>Starting Latitude:</strong> {rowData.start_lat}
              </p>
              <p>
                <strong>Ending Latitude:</strong> {rowData.dest_lat}
              </p>
              <p>
                <strong>Starting Longitude:</strong> {rowData.start_long}
              </p>
              <p>
                <strong>Ending Longitude:</strong> {rowData.dest_lat}
              </p>
              <p>
                <strong>Created At:</strong> {getTime(rowData.created_at)}
              </p>
              <p>
                <strong>Updated At:</strong> {getTime(rowData.updated_at)}
              </p>
              <p>
                <strong>Total Distance Covered: </strong>
                {rowData.total_distance.toFixed(2)}
              </p>
              <p>
                <strong>Total Price:</strong> ${rowData.total_price.toFixed(2)}
              </p>
            </div>
          )} */}
        </DialogContent>
        {rowData && (
          <>
            {" "}
            <div style={{ paddingLeft: 20 }}>
              <strong>Vehicle ID:</strong> {rowData.obu_id}
            </div>
            <div className="parent">
              <div>
                <strong>Starting Latitude:</strong> {rowData.start_lat}
              </div>
              <div>
                <strong>Ending Latitude:</strong> {rowData.dest_lat}
              </div>
              <div>
                <strong>Starting Longitude:</strong> {rowData.start_long}
              </div>
              <div>
                <strong>Ending Longitude:</strong> {rowData.dest_long}
              </div>
              <div>
                <strong>Created At:</strong> {getTime(rowData.created_at)}
              </div>

              <div>
                <strong>Updated At:</strong> {getTime(rowData.updated_at)}
              </div>
              <div>
                <strong>Total Distance Covered: </strong>
                {rowData.total_distance.toFixed(2)}
              </div>
              <div>
                <strong>Total Price:</strong> ${rowData.total_price.toFixed(2)}
              </div>
            </div>
          </>
        )}

        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button
              //   onClick={handleClose}
              onClick={downloadAsPDF}
              variant="contained"
              endIcon={<FileDownloadIcon />}
            >
              Download invoice
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default VechileDialog;
