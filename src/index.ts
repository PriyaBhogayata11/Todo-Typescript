import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { CrudManager } from "./crud.manager";

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  //let output = { data: "GET" };
  let output = await CrudManager.read();
  res.json(output);
});

app.post("/", async (req, res) => {
  let input = req.body;
  //let output = { data: "POST", todo: input.todo };

  let output = await CrudManager.create(input);
  res.json(output);
});

app.put("/", async (req, res) => {
  let input = req.body;
  //let output = { data: "PUT" };

  let output = await CrudManager.update(input);
  res.json(output);
});

app.delete("/", async (req, res) => {
  let input = req.body;
  //let output = { data: "DELETE" };
  let output = await CrudManager.delete(input);
  res.json(output);
});

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
