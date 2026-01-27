import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

/*
If your senior asks “how?”

You say:

“I send the product name to an AI API, and it returns the correct category.” */

// recharts.js with shadcnui for chart best combo  => https://recharts.github.io/en-US/
