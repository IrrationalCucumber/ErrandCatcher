import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

function ErrorElement() {
  const { user } = useAuth();
  return (
    <div>
      <h1>ERROR 404: Page Not Found</h1>
      {user ? (
        <h5>
          Go back <Link to={"/dashboard/home"}>HOME</Link>
        </h5>
      ) : (
        <h5>
          Go back <Link to={"/"}>HOME</Link>
        </h5>
      )}
    </div>
  );
}

export default ErrorElement;
