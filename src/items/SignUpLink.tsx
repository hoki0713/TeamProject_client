import * as React from 'react';
import { Link } from 'react-router-dom';

type SignUpLinkProps = {
  name: string;
}

function SignUpLink({ name }: SignUpLinkProps) {
  return (
    <Link to="/account/term-n-condition" className="nav-link">
      {name}
    </Link>
  );
}

SignUpLink.defaultProps = {
  name: "회원가입"
}

export default SignUpLink;