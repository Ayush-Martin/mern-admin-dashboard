import { Outlet } from "react-router-dom";

import bg1 from "../assets/bg1.jpg";

const Layout = () => {
  return (
    <main className="relative w-full h-screen">
      <img src={bg1} className="object-cover w-full h-full" />
      <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col w-full h-full">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
