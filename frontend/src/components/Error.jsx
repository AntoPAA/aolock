import React from "react";
import "./Error.css";
import brain from "../public/brain.jpg";

function Error() {
  return (
    <div className="ctnError">
      <h1 className="textError">Error 404</h1>
      <h1 className="textError">My brain :</h1>
      <img className="imgError" src={brain} alt="brain" />
    </div>
  );
}

export default Error;
