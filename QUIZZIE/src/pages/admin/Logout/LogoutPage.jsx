import React from "react";
import "./LogoutPage.css";
import { Button } from "../../../components";
import { useNavigate } from "react-router-dom";
import setToken from "../../../utils/setToken";

function LogoutPage({ cancelHandle }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    navigate("/login");
  };

  return (
    <div className="logout-main-div">
      <div className="logout-card">
        <div className="logout-text">Are sure you want to logout ?</div>
        <div className="logout-btns">
          <div className="logout-btn-div">
            <Button
              className="logout-cancel-btn"
              children="Cancel"
              onClick={() => cancelHandle(false)}
            />
          </div>
          <div className="logout-btn-div">
            <Button
              className="logout-confirm-btn"
              children="Confirm Logout"
              onClick={handleLogout}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutPage;
