import { lazy } from "react";
import Header from "../components/Header/Header.jsx";
import DeferredComponent from "../components/DeferredComponent/DeferredComponent.jsx";

const Footer = lazy(() => import("../components/Footer/Footer.jsx"));

const Layout = ({ children, header = 1, footer }) => {
  return (
    <>
      {header === 1 && <Header />}
      <main>{children}</main>
      {footer === 1 && (
        <DeferredComponent component={Footer} minHeight={420} rootMargin="700px 0px" />
      )}
    </>
  );
};

export default Layout;
