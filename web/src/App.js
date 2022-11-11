import TextField from "@material-ui/core/TextField";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import axios from 'axios'
import "./App.css";

function App() {
//   const getMsgs = async () => {
//     return await axios
//       .get("http://localhost:4000/msg")
//       .then(function (response) {
//         // handle success
//         console.log(response.data.msgs);
// 		setChat(response.data.msgs)
//       }).data.msgs
//   };

  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();
    useEffect( async () => {
		await axios
      .get("http://localhost:4000/msg")
      .then(function (response) {
        // handle success
        console.log(response.data.msgs);
		setChat(response.data.msgs)
      })
    }, []);
  useEffect(() => {
    socketRef.current = io.connect("http://localhost:4000");
    // var data = getMsgs()
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { user: name, msg: message }]);
    });
    return () => socketRef.current.disconnect();
  }, [chat]);

  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onMessageSubmit = (e) => {
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  const renderChat = () => {
    return chat.map(({ user, msg, channel }, index) => (
      <div key={index}>
        <h3>
          {user} : <span>{msg}</span>
        </h3>
      </div>
    ));
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Messenger</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Chat Log</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
