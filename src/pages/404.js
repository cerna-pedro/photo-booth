import React from "react";
import { Link } from "gatsby";
import SEO from "../components/SEO";

const NotFound = () => {
  return (
    <>
      <SEO />
      <h1>PAGE NOT FOUND</h1>
      <p>
        You just hit a route that doesn't seem to exist...
        <span role="img" aria-label="Crying Face">
          😢
        </span>
      </p>
      <p>
        Click{" "}
        <Link fade to="/" duration={0.3} title="Home Page">
          here
        </Link>{" "}
        to go back to the home page.
      </p>
    </>
  );
};

export default NotFound;
