import * as React from 'react';
import { Link } from 'react-router-dom';

type MenuIconProps = {
  Image: string;
  Alt: string;
}

function MenuIcon({ Image, Alt }: MenuIconProps) {
  return (
    <Link to="/" className="nav-link">
      <img src={Image} alt={Alt} />
    </Link>
  );
}

MenuIcon.defaultProps = {
  Image: "https://res.cloudinary.com/hoki0713/image/upload/v1591799423/team-mobeom/menu-24px_zoo6w7.svg",
  Alt: "메뉴 아이콘"
}

export default MenuIcon;