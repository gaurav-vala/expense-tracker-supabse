import { Link, NavLink, useLocation } from "react-router-dom";

export default function BottomNavbar() {
  const pathPattern = useLocation();

  return (
    <>
      <div className="btm-nav container mx-auto">
        <NavLink activeclassname="active" to="/">
          Home
        </NavLink>
        <NavLink activeclassname="active" to="/expenses">
          View Expenses
        </NavLink>
        <NavLink activeclassname="active" to="/login">
          Login
        </NavLink>
      </div>
    </>
  );
}
