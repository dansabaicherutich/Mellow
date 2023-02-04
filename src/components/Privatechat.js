import React from "react";

function Privatechat(props) {
  return (
    <div>
      <div>
        {props.chats.map((data) => {
          return (
            <div className="priv">
              <h5 className="sender">{data.scont}</h5>
              <h5 className="receiver">{data.rcont}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Privatechat;
