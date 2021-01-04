import React from "react";
import { Spinner } from "react-bootstrap";


const LoadingScreen = () => {



  return (
    <Spinner
      animation="grow"
      role="status"
      style={{
        width: "150px",
        height: "150px",
        margin: "auto",
        display: "block",
        marginTop: "60%"
      }}
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
}

export default LoadingScreen


