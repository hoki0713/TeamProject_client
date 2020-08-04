import * as React from 'react';
import { Link } from 'react-router-dom';

type MenuIconProps = {
  Image: string;
  Alt: string;
}

const MenuIcon = ({ Image, Alt }: MenuIconProps) => {
  return (
    <>
      <div className="dropdown">
        <button className="btn" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <img src={Image} alt={Alt} />
        </button>
        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <div><Link className="dropdown-item" to="/">Action</Link></div>
          <Link className="dropdown-item" to="/">Another action</Link>
          <Link className="dropdown-item" to="/">Something else here</Link>
        </div>
      </div>
    </>

  );
}

MenuIcon.defaultProps = {
  Image: "https://res.cloudinary.com/hoki0713/image/upload/v1591799423/team-mobeom/menu-24px_zoo6w7.svg",
  Alt: "메뉴 아이콘"
}

export default MenuIcon;