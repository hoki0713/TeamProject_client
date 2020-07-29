import * as React from "react";

type MapImageProps = {
    Image: string;
    Alt: string;
}
function PurchaseMapImg({ Image, Alt }: MapImageProps) {
    return (
        <div className="purchaseMap">
            <img src={Image} alt={Alt} useMap="#purchaswMap" width="500px" height="500px"/>
        </div>
    );
}

PurchaseMapImg.defaultProps = {
    Image: "https://res.cloudinary.com/hoki0713/image/upload/v1594123931/team-mobeom/map_qpyfj4.png",
    Alt: "구매화면용 경기도 지도"
}

export default PurchaseMapImg