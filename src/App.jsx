import { Link, Route, Routes, createBrowserRouter } from "react-router-dom";
import BottomNavbar from "./components/BottomNavbar";
import ExpenseConnection from "./components/ExpenseConnection";
import TopNav from "./components/TopNav";
import Login from "./components/Login";
import ExpenseListing from "./components/ExpenseListing";

function App() {
  return (
    <>
      <div className="main_container container mx-auto px-5 relative">
        <TopNav />

        <Routes>
          <Route Component={ExpenseConnection} path="/"></Route>
          <Route Component={Login} path="/login"></Route>
          <Route Component={ExpenseListing} path="/expenses"></Route>
        </Routes>

        <BottomNavbar />
      </div>
    </>
  );
}

export default App;
