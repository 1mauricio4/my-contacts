const express = require("express");
const app = express();

const connectDB = require("./config/db");

// connect database
connectDB();

const users = require("./routes/users");
const auth = require("./routes/auth");
const contacts = require("./routes/contacts");

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/contacts", contacts);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`listening on port ${PORT}...`));
