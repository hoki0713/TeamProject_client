import * as React from 'react';
import { Link } from 'react-router-dom';

type LoginLinkProps = {
  name: string;
}

function LoginLink({ name }: LoginLinkProps) {
  return (
      <Link to="/account/login" className="nav-link">
        {name}
      </Link>
  );
}

LoginLink.defaultProps = {
  name: "로그인"
};

export default LoginLink;