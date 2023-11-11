import express from "express";

const port = 3000;
const app = express();

app.get("/heavy", (req, res) => {
  let total = 0;
  for (let i = 0; i < 5000000; i++) {
    total++;
  }
  res.send(`Total is ${total}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log("worker process id: ", process.pid);
});
