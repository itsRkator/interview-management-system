require("dotenv").config();
const express = require("express");
const cors = require("cors");

const db = require("./src/config/db");

const app = express();

db.connect();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors());
app.use(express.json());

const router = require("./src/routes/router");

app.use("/api", router);

const PORT = process.env.PORT || 4300;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
