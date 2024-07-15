const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let ids = 0;

app.use(bodyParser.json());

let todoList = [];

app.get("/todos", function (req, res) {
  res.status(200).send(todoList);
});
app.get("/todos/:id", function (req, res) {
  const id_no = parseInt(req.params.id);

  if (id_no <= todoList.length && id_no > 0) {
    res.status(200).json(todoList[id_no - 1]);
  } else {
    res.status(404).send("404 NOT FOUND!");
  }
});
app.post("/todos", function (req, res) {
  let item = req.body;
  todoList.push(item);
  ids = ids + 1;
  res.status(201).json({
    id: ids,
  });
});

app.put("/todos/:id", function (req, res) {
  const id_no = parseInt(req.params.id);
  const updateBody = req.body;
  const todo = todoList[id_no-1];
  console.log(todo);
  if (id_no <= todoList.length) {
    Object.keys(updateBody).forEach(key => {
      todo[key] = updateBody[key];
    });
  } else {
    res.status(404).send("404 Not found :(");
  }
  res.send("ok");
});
app.delete("/todos/:id", function (req, res) {
  const id_no = parseInt(req.params.id);
  if(id_no <= todoList.length ){
    todoList.splice(id_no-1, 1);
    ids--;
    res.status(200).json({
      status : "Deletion Succesfull!",
      id : ids
    })
  }
  else{
    res.status(404).json({
      msg: "Item not Found! 404"
    })
  }
});

app.use(function(req,res,next){
  res.status(400).send("<h1>This type of Request is Not Defined</h1>")
})

app.listen(3000, function () {
  console.log("connection established");
});

module.exports = app;