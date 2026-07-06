import React from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Layout = ({ children, header = 1, footer }) => {
  return (
    <>
      {header === 1 && <Header />}
      <main>{children}</main>
      {footer === 1 && <Footer />}
    </>
  );
};

export default Layout;
