const express = require("express");
const app = express();
const ConnectDB = require("./config/db");

//this process.env.PORT is used to set the port number for the variable evironment
const port = process.env.PORT || 5000;
//DB Connection
ConnectDB();
app.get("/", (req, res) => res.send("Hello From Express"));
app.use(express.json());
// Start the server
//this app.use is used to tell express to use the router
app.use("/users", require("./routes/users"));
app.use("/profile", require("./routes/profile"));
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));

app.listen(port, () => console.log(`Listening on port ${port}`));
