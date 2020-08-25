import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyBCjj2hELnBZqNrfMSwlka2ezNRrysnlNY");

export const getLatLng = (location) =>{
    Geocode.fromAddress(location).then(
        response => {
            const resLatLng = response.results[0].geometry.location;
            return {lat:resLatLng.lat, lng:resLatLng.lng};
        },
        error => {
            console.error(error);
        }
    );
}

