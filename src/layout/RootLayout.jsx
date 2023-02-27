import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import UserContextProvider from "../context/UserContext";

const Root = () => {
  return (
    <UserContextProvider>
        <Header />
        <Outlet />
    </UserContextProvider>
  );
};

export default Root;
