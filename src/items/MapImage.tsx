import * as React from 'react';

type MapImageProps = {
  Image: string;
  Alt: string;
}

function MapImage({ Image, Alt }: MapImageProps) {
  return (
    <div className="container">
      <div className="row justify-content-md-center">
        <img src={Image} alt={Alt} useMap="#mainMap"/>
      </div>
    </div>      
  );
}

MapImage.defaultProps = {
  Image: "https://res.cloudinary.com/hoki0713/image/upload/v1594123931/team-mobeom/map_qpyfj4.png",
  Alt: "경기도 지도"
}


export default MapImage;