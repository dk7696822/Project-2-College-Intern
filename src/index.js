const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./route/route");
const ObjectId = mongoose.Types.ObjectId;
app.use(express.json());
mongoose
  .connect(
    "mongodb+srv://dk7696822:wnyQpzrA3d4AcykC@cluster0.hef809l.mongodb.net/Group7Database?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log(err.message));
app.use("/", route);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
