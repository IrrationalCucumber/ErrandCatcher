import React from "react";
import { Link } from "react-router-dom";

function ErrorElement() {
  return (
    <div>
      <h1>ERROR 404: Page Not Found</h1>
      <h5>
        Go back <Link to={"/dashboard/home"}>HOME</Link>
      </h5>
    </div>
  );
}

export default ErrorElement;
