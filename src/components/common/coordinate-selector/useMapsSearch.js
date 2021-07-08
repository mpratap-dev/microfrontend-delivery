import { useState } from 'react';
import lodash from 'lodash';

const useMapsSearch = ({center}) => {
  const [state, setState] = useState({
    bounds: null,
    center,
    markers: [],
  });
  
  const refs = {};
  const google = window.google;

  const onMapMounted = (ref) => {
    refs.map = ref;
  }

  const onSearchBoxMounted = (ref) => {
    refs.searchBox = ref;
  }
  // * Caused issues in scrolling smoothly
  // const onBoundsChanged = (params) => {
  //   console.log(params);
  //   setState({
  //     ...state,
  //     bounds: refs.map.getBounds(),
  //     center: refs.map.getCenter(),
  //   })
  // }

  const onPlacesChanged = () => {
    const places = refs.searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    places.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });

    const nextMarkers = places.map(place => ({
      position: place.geometry.location,
    }));

    const nextCenter = lodash.get(nextMarkers, '0.position', state.center);

    setState({
      ...state,
      center: nextCenter,
      markers: nextMarkers,
    });
  }

  return {
    onMapMounted,
    onSearchBoxMounted,
    // onBoundsChanged,
    onPlacesChanged,
    center: state.center
  }
}

export default useMapsSearch;