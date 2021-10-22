import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { useState } from 'react'
import getCenter from 'geolib/es/getCenter'

function Map({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState('')
  //TRansform the searchResults object into the {latitude:xxxxx, longitute:xxxxx} object
  const coordinates = searchResults.map((result) => ({
    longitude: result.long,
    latitude: result.lat,
  }))

  const center = getCenter(coordinates)
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })

  return (
    <ReactMapGL
      mapStyle='mapbox://styles/dnyamwamu/ckv223z512y6315npndfhki2s'
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-20}
          >
            <p
              onClick={() => setSelectedLocation(result)}
              className='cursor-pointer text-2xl animate-bounce'
              aria-label='push-pin'
            >
              🏨
            </p>
          </Marker>
          {/* Show popup after clicking the marker */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={true}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default Map
