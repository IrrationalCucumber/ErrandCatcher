import React, { useState } from "react";

export default function Testpage() {
  const test = () => {
    alert("click");
  };
  const [password, setPassword] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Call your test function here
    test();
  };
  return (
    <div>
      test
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" value="Submit">
          TEST
        </button>
      </form>
    </div>
  );
}
