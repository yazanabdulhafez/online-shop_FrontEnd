import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {Button}from 'react-bootstrap';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button style={{marginLeft:'1.4rem'}} onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;