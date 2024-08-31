import "./Authlayout.css";
import { AuthHeader, Container } from "../../components";
import { Outlet } from "react-router-dom";

function Authlayout() {
  return (
    <>
      <Container className="auth-layout">
        <Container className="auth-layout-container">
          <AuthHeader />
          <Outlet />
        </Container>
      </Container>
    </>
  );
}

export default Authlayout;
