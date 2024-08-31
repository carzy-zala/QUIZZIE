import React, { useEffect } from "react";
import AuthGuard from "../../guard/AuthGuard";
import { Container, Sidebar } from "../../components";
import { Outlet } from "react-router-dom";
import "./Adminlayout.css";
import setToken from "../../utils/setToken";


function Adminlayout() {
  (async () => {
    await setToken(localStorage.getItem("accessToken"));
  })();

  

  return (
    <Container className="admin-layout">
      <AuthGuard>
        <Container className="sidebar-div">
          <Sidebar />
        </Container>
        <Outlet />
      </AuthGuard>
    </Container>
  );
}

export default Adminlayout;
