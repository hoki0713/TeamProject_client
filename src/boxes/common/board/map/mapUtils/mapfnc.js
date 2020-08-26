import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyCzhclpVLv4R5FOEjmP6386O4QItwCYdHA");

export const getLatLng = (location) =>{
    Geocode.fromAddress(location).then(
        response => {
            const resLatLng = response.results[0].geometry.location;
            console.log(`getLatLng ${resLatLng.lat} ${resLatLng.lng}`);
            return {lat:resLatLng.lat, lng:resLatLng.lng};
        },
        error => {
            console.error(error);
        }
    );
}

