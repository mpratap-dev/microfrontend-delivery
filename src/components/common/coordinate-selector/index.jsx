import { Paper } from "@material-ui/core";
import React, { useEffect, useState, lazy } from "react";
import Typography from "@material-ui/core/Typography";
import If from "../if";

const MapComponent = lazy(() => import("./MapComponent"));

const CoordinateSelector = (props) => {
  const [ready, setReady] = useState(false);
  const { handleClick, inputProps } = props;
  const { placeholder } = inputProps;

  const getCurrentLatLong = () => {
    let position = {};
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      position = coords;
    });

    return position;
  };

  const { latitude = 28.4852953, longitude = 77.0725107 } = getCurrentLatLong();

  const [markerLocation, setLocation] = useState({
    lat: latitude,
    lng: longitude,
  });

  const handleMapClick = ({ latLng: { lat, lng } }) => {
    const coordinates = {
      lat: lat(),
      lng: lng(),
    };

    setLocation(coordinates);

    (typeof handleClick === 'function') && handleClick(coordinates);
  };

  useEffect(() => {
    setTimeout(() => {
      if (window.google) setReady(true);
    }, 0);
  }, []);

  return (
    <If condition={ready} lazyload>
      <Paper>
        <MapComponent
          {...props}
          defaultCenter={markerLocation}
          markerLocation={markerLocation}
          inputProps={{ placeholder }}
          onMapClick={handleMapClick}
        />
      </Paper>
      <Typography
        color="primary"
        variant="overline"
        display="block"
        gutterBottom
      >
        Click on map to set lat/lng
      </Typography>
    </If>
  );
};

export default CoordinateSelector;
