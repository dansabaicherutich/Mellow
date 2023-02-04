import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Privatechat from "./Privatechat";

const socket = io("http://localhost:3001");

function Dashboard(props) {
  socket.on("connection", () => {});

  const location = useLocation();

  const { phonenumber } = location.state;
  const { username } = location.state;

  const [usernames, setUsernames] = useState([]);
  const [message, setMessage] = useState("");
  const [time, setTime] = useState("");
  const [chatpartner, setChatpartner] = useState("");
  
  const [privatechats, setPrivatechats] = useState([]);

  const alldet = {
    user: username,
    message: message,
    timestamp: time,
  };


  useEffect(() => {
    socket.emit("phone", { phonenumber });
  }, [phonenumber]);

  useEffect(() => {
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const currenttime = hours + ":" + minutes;
    setTime(currenttime);
  }, [time]);

  useEffect(() => {
    socket.on("receiver", (data) => {
      const rc = {
        rcont: data,
      };
      setPrivatechats([...privatechats, rc]);
    });
  }, [privatechats]);
  useEffect(() => {
    socket.on("sender", (data) => {
      const se = {
        scont: data,
      };
      setPrivatechats([...privatechats, se]);
    });
  }, [privatechats]);

  async function fas() {
    try {
      const res = await axios.get("http://localhost:3001/getusers");
      setUsernames(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  fas();

  function Handlepost() {
    axios.post("http://localhost:3001/messagedetails", { alldet });
    socket.emit("newmessage", { message });
    setMessage("");
  }

  return (
    <div className="dashboard">
      <div>
        <Header users={username} />
      </div>

      <div className="middle">
        <div className="registeredUsers">
          {usernames.map((data) => {
            return (
              <button
                key={data._id}
                onClick={() => {
                  const yy = data.phonenumber;

                  setChatpartner(data.username);
                  socket.emit("clickednum", { yy });
                }}
              >
                {data.username}
              </button>
            );
          })}
        </div>

        <div className="messages">
          <div className="fetchedMessages">
            <h3>Chats with</h3> <h4>{chatpartner}</h4>
            <Privatechat
              receiver={chatpartner}
              sender={username}
              chats={privatechats}
            />
          </div>

          <div className="createMessage">
            <textarea
              type={"text"}
              placeholder="Write Message..."
              id="newmessage"
              name="newmessage"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              onBlur={(e) => {
                e.target.value = "";
              }}
            ></textarea>
            <button
              onClick={() => {
                Handlepost();
              }}
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
