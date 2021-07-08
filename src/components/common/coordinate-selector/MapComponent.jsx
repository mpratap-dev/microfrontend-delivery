import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import useMapsSearch from "./useMapsSearch";

const useStyles = makeStyles({
  input: {
    boxSizing: 'border-box',
    border: '1px solid transparent',
    width: '240px',
    height: '40px',
    margin: '10px 10px 0 0',
    padding: '0 12px',
    borderRadius: '3px',
    boxShadow: 'rgb(0 0 0 / 30%) 0px 1px 4px -1px',
    fontSize: '14px',
    outline: 'none',
    textOverflow: 'ellipses',
  }
})

const MapComponent = withGoogleMap((props) => {
  const classes = useStyles();
  const google = window.google;

  const {
    onMapClick,
    defaultCenter,
    markerLocation,
    zoom = 16,
    inputProps,
    options={
      fullscreenControl: false,
      streetViewControl: false,
    },
  } = props;

  const { placeholder = 'Search location' } = inputProps;
  
  const {
    onMapMounted,
    onSearchBoxMounted,
    // onBoundsChanged,
    onPlacesChanged,
    center
  } = useMapsSearch({ center: defaultCenter });

  return (
    <GoogleMap
      ref={onMapMounted}
      defaultZoom={zoom}
      center={center}
      onClick={onMapClick}
      defaultCenter={defaultCenter}
      options={options}
      // onBoundsChanged={onBoundsChanged}
    >
      <SearchBox
        ref={onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_RIGHT}
        onPlacesChanged={onPlacesChanged}
      >
        <input
          type="search"
          placeholder={placeholder}
          className={classes.input}
        />
      </SearchBox>
      <Marker position={markerLocation} />
    </GoogleMap>
  );
});

export default MapComponent;
