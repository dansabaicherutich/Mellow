import axios from "axios";
import React, { useState } from "react";

import Header from "./Header";

function Groupchat() {
  const [chats, setChats] = useState([]);

  async function Getchats() {
    try {
      const res = await axios.get("http://localhost:3001/getgroupchats");
      setChats(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  Getchats();

  return (
    <div className="group">
      <Header />
      <div>
        {chats.map((chat) => {
          return (
            <div className="groupchat" key={chat._id}>
              <h5>{chat.user}</h5>

              <h4>{chat.message}</h4>

              <h6>{chat.timestamp}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Groupchat;
