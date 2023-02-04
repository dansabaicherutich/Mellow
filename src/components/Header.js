import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const users = props.users;
  const das = props.das;
  if (das === "false") {
    return (
      <div>
        <div className="header">
          <div>
            <img src="../assets/logo.png" alt="logo"></img>
            <h4>{users}</h4>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="header">
          <div>
            <img src="../assets/logo.png" alt="logo"></img>
            <h4>{users}</h4>
          </div>
          <div className="buttons">
          <button><Link to={'/groupchat'}>ADMIN</Link></button>
            <button><Link to={'/privatechat'} >GO PRIVATE</Link></button>
            <button>GROUP CHAT</button>
          </div>
        </div>
      </div>
    );
  }
}
export default Header;
