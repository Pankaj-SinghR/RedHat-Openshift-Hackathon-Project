import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const locations = [
  {
    label: "Location 1",
    startLat: 40.7128,
    startLon: -74.006,
    endLat: 34.0522,
    endLon: -118.2437,
  },
  {
    label: "Location 2",
    startLat: 34.0522,
    startLon: -118.2437,
    endLat: 51.5074,
    endLon: -0.1278,
  },
  {
    label: "Location 3",
    startLat: 51.5074,
    startLon: -0.1278,
    endLat: 48.8566,
    endLon: 2.3522,
  },
  {
    label: "Location 4",
    startLat: 48.8566,
    startLon: 2.3522,
    endLat: 52.52,
    endLon: 13.405,
  },
  {
    label: "Location 5",
    startLat: 52.52,
    startLon: 13.405,
    endLat: 40.7128,
    endLon: -74.006,
  },
];

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

    // Calculate total distance and toll price based on latitude and longitude.
    const start = locations.find((loc) => loc.label === startLocation);
    const end = locations.find((loc) => loc.label === endingLocation);

    if (start && end) {
      const distance = calculateDistance(
        start.startLat,
        start.startLon,
        end.endLat,
        end.endLon
      );
      const tollPrice = calculateTollPrice(distance);

      setTotalDistance(distance);
      setTotalTollPrice(tollPrice);
    }
  };

  // Calculate distance using the Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // Miles
    dist = dist * 1.609344; // Kilometers
    return dist;
  };

  const calculateTollPrice = (distance) => {
    return distance * 0.1; // $0.1 per km.
  };

  return (
    <div style={{ width: "50%", margin: "0 auto" }}>
      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}
      <Box>
        <div style={{ display: "flex", gap: 10 }}>
          <FormControl fullWidth>
            <InputLabel id="start-location-label">Starting Location</InputLabel>
            <Select
              labelId="start-location-label"
              id="start-location-select"
              value={startLocation}
              label="Starting Location"
              onChange={handleStartChange}
            >
              {locations.map((location) => (
                <MenuItem key={location.label} value={location.label}>
                  {location.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="end-location-label">Ending Location</InputLabel>
            <Select
              labelId="end-location-label"
              id="end-location-select"
              value={endingLocation}
              label="Ending Location"
              onChange={handleEndChange}
            >
              {locations.map((location) => (
                <MenuItem key={location.label} value={location.label}>
                  {location.label}
                </MenuItem>
              ))}
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
          Total Distance Covered: {totalDistance.toFixed(2)} km
        </Typography>
        <Typography variant="h6">
          Total Toll Price: $ {totalTollPrice.toFixed(2)}
        </Typography>
      </Box>
    </div>
  );
};

export default PlannedTrips;
