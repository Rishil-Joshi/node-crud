const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  res.send(user);
});

app.post("/users", (req, res) => {
  const body = req.body;
  users.push(body);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.send(`User added with name ${body.first_name} and id ${body.id}`);
  });
});

app.patch("/users/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  console.log(body, id);
  const user = users.find((user) => user.id === parseInt(id));
  user.first_name = body.first_name;
  user.last_name = body.last_name;
  user.gender = body.gender;
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    res.send(`User updated with id ${id}`);
  });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users.find((user) => user.id === parseInt(id));
  console.log(user);
  const index = users.indexOf(user);
  users.splice(index, 1);
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    if (err) {
      console.log(err);
    }
    res.send(`User deleted with id ${id}`);
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
