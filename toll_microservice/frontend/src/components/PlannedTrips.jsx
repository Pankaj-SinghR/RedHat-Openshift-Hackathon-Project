import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const PlannedTrips = () => {
  const [startLocation, setStartLocation] = useState("");
  const [endingLocation, setEndingLocation] = useState("");
  const [totalDistance, setTotalDistance] = useState(0);
  const [totalTollPrice, setTotalTollPrice] = useState(0);
  const [error, setError] = useState("");

  const handleStartChange = (event) => {
    setStartLocation(event.target.value);
    setError("");
  };

  const handleEndChange = (event) => {
    setEndingLocation(event.target.value);
    setError("");
  };

  const handleButtonClick = () => {
    if (!startLocation || !endingLocation) {
      setError("Please select both starting and ending locations.");
      return;
    }

    // Calculate toll price and distance,
  };

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
      }}
    >
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Box>
        <div style={{ display: "flex", gap: 10 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Starting Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={startLocation}
              label="startLocation"
              onChange={handleStartChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Ending Location
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={endingLocation}
              label="endingLocation"
              onChange={handleEndChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
            </Select>
          </FormControl>
        </div>

        <Button
          onClick={handleButtonClick}
          variant="contained"
          style={{ marginTop: 20, marginBottom: 20 }}
        >
          Find Total Toll
        </Button>

        <Typography variant="h6">
          Total Distance Covered: {totalDistance} km
        </Typography>
        <Typography variant="h6">
          Total Toll Price: $ {totalTollPrice.toFixed(2)}
        </Typography>
      </Box>
    </div>
  );
};

export default PlannedTrips;
