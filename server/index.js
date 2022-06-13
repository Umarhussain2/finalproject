let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let authRoutes = require("./Routes/yarnroutes");
let app = express();
let cookieParser = require("cookie-parser");

app.use(express.json());

app.listen(4000, () => {
  console.log("server started on port 4000");
});

mongoose
  .connect(
    "mongodb+srv://Umarhussain26:987654321@cluster0.t4ho2.mongodb.net/wwf?retryWrites=true&w=majority",
    {
      useNewurlparser: true,
      useunifiedTopology: true,
    }
  )
  .then(() => {
    console.log("sucessfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes);
