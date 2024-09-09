import express from "express";
import cors from "cors";
import { readFile, writeFile } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.post("/card", async (req, res) => {
  const { title, body } = req.body;

  await addNewCard(title, body);

  res.send();
});
app.get("/cards", async (req, res) => {
  const cards = await getCards();

  res.send(cards);
});
app.listen(port, () => {
  console.log("app is working");
});

async function getCards() {
  return JSON.parse(
    (await readFile("data/cards.json", { encoding: "utf8" })) || "[]",
  );
}

async function addNewCard(title, body) {
  const cards = await getCards();

  await writeFile(
    "data/cards.json",
    JSON.stringify([...cards, { title, body, id: uuidv4() }]),
    (err) => {
      throw err;
    },
  );
}
