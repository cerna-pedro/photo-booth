import React from "react";
import Footer from "./Footer";
import "typeface-nothing-you-could-do";
import "./styles.css";

const Layout = ({ children }) => {
  return (
    <div className="container">
      <main>
        <section>{children}</section>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
