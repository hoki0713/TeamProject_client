import * as React from 'react';

type logoProps = {
  Image: string;
  Alt: string;
};

function Logo({ Image, Alt }: logoProps) {
  return (
    <img src={Image} alt={Alt} className="logo" />
  );
}

Logo.defaultProps = {
  Image: "https://res.cloudinary.com/hoki0713/image/upload/v1591798057/team-mobeom/money-logo2_q9xqve.svg",
  Alt: "모범시민 로고이미지"
};

export default Logo;