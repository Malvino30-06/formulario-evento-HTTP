import express from "express";

const host = "0.0.0.0";
const port = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(``);
});

app.post("/evento", (req, res) => {
  res.redirect("/listaEventos");
});

app.get("/listaEventos", (req, res) => {
  res.write(``);

  for (let i = 0; i < eventos.length; i++) {
    res.write(``);
  }

  res.write(`
        `);

  res.end();
});

app.listen(() => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
