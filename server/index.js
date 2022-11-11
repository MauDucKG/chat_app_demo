const app = require("express")();
const mongoose = require("mongoose");
const Msg = require("./message/message.model");
const msgRouter = require('./message/message.router')
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const cors = require("cors");

const mongoDB_url =
  "mongodb+srv://mauduckg:mauduckg@chatapp.mucku7a.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoDB_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

io.on("connection", (socket) => {
  socket.on("message", ({ message, name }) => {
    const channel = "message";
    const message_save = new Msg({
      msg: message,
      user: name,
      channel: channel,
    });
    message_save.save().then(() => {
      io.emit("message", { name, message });
    });
  });
});

http.listen(4000, function () {
  console.log("listening on port 4000");
});

app.use(cors());
app.use('/msg', msgRouter);
