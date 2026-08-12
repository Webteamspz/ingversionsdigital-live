import React from "react";
import Header from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

const Layout = ({ children, header = 1, footer }) => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      {header === 1 && <Header />}
      <main id="main-content">{children}</main>
      {footer === 1 && <Footer />}
    </>
  );
};

export default Layout;
