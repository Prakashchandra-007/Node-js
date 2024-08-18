const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [];
app.get("/", (req, res) => {
  res.json(users);
});

app.post("/adduser", (req, res) => {
  // res.json(req)
  let newuser = req.body;
  console.log(newuser, "newuser");

  let lengthOflist = users.length;
  let id = lengthOflist > 0 ? users[lengthOflist - 1].id : 0;
  newuser.id = id + 1;
  users.push(newuser);
  res.json({ status: "new user added ", data: users });
});

app.delete("/delete/:id", (req, res) => {
  let id = req.params.id;
  console.log(req.params.id, "????????", users);
  let userIndex = users.findIndex((item) => item.id == id);
  console.log(userIndex, "userIndex");

  if (userIndex === -1) {
    res.status(404).json({ messaege: "user not found" });
  } else {
    users.splice(userIndex, 1);
    res.json({ messaeg: " deleted successfully" });
  }
});

app.listen(port, () => {
  console.log("app running on", port);
});
