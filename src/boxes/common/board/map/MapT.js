import React, {memo, useCallback, useState} from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '400px'
};

let center = {
    lat: 37.5717975, lng: 126.9325254
};

function MapT() {
    const [map, setMap] = useState(null)

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (
        <>
        <LoadScript
            googleMapsApiKey="AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY"
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onUnmount={onUnmount}
            >
                { /* Child components, such as markers, info windows, etc. */ }
                <></>
            </GoogleMap>
        </LoadScript>
            </>
    )
}

export default memo(MapT)