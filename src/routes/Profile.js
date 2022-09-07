import { authService } from "fbase";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const onLogOutClick = () => {
    authService.signOut();
    navigate(`/`);
  };
  const navigate = useNavigate();
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
}
