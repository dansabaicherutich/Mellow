import React, { useState } from "react";
import Header from "./Header";

import axios from "axios";
import { Link } from "react-router-dom";

function LandingPage() {
  const [user, setUser] = useState("");
  const [phone, setPhone] = useState("");

  function handleclick() {
    if (user !== "" && phone !== "") {
      const details = {
        phone: phone,
        user: user,
      };
      axios.post("http://localhost:3001/user", { details });
    }
  }

  return (
    <div className="landingpage">
      <div>
        <Header das="false" />
      </div>

      <div className="user">
        <input
          type={"text"}
          placeholder="Enter username..."
          name="username"
          id="username"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        ></input>

        <input
          type={"text"}
          placeholder="Enter phone number..."
          name="phonenumber"
          id="phonenumber"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        ></input>

        <button
          onClick={() => {
            handleclick();
          }}
        >
          <Link to="/dashboard" state={{ username: user, phonenumber: phone }}>
            Join
          </Link>
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
