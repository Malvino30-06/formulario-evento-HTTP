import express from "express";

const host = "0.0.0.0";
const port = 3000;
const app = express();

var dadosEventos = [];

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <!-- Required meta tags-->
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  </head>
  
  <body>
  <div class="form-row mx-auto text-center m-5 container"> <form method="POST" action="/evento"> <h1>Informações</h1>

        <label class="label--desc">Informações do Evento</label>
        <div class="form-floating">
            <div class="input-group-desc">
                <textarea class="form-control" rows="4" name="eventInfo" style="padding: 12px; line-height: 1.4"></textarea>
            </div>
        </div>

        <div class="form-row form-floating">
            <div class="name">Tipo</div>
            <select class="form-select" name="opcoes">
                <option disabled="disabled" selected="selected">Escolha uma opção</option>
                    <option value="1">Social</option>
                    <option value="2">Corporativo</option>
                    <option value="3">Cultural</option>
                    <option value="4">Acadêmico</option>
                    <option value="5">Esportivo</option>
                    <option value="6">Diverso</option>
                </select>
            <div class="select-dropdown"></div>
        </div> <div class="form-row">
            <div class="name">Orçamento</div>
            <div class="input-group mb-3">
                <input class="form-control" type="text" name="orcamento" id="valor" step="100.00" placeholder="100.00" />
                <label class="label--desc"></label>
            </div>
        </div> <div class="form-row">
            <div class="name">Participantes</div>
            <div class="input-group mb-3">
                <input class="form-control" type="number" name="participantes" placeholder="Número estimado de participantes" />
            </div>
        </div> <div class="form-row m-b-55">
            <div class="name">Data do Evento</div>
            <div class="form-control">
                <div class="row row-space mx-auto">
                    <div class="col-2">
                        <div class="input-group-desc">
                            <input class="input--style-5" type="date" name="dataI" />
                            <label class="label--desc">Inicio</label>
                        </div>
                    </div>
                    <div class="col-2">
                        <div class="input-group-desc">
                            <input class="input--style-5" type="date" name="dataF" />
                            <label class="label--desc">Fim</label>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <button class="btn btn-success" type="submit">Registrar</button>
            </div>
        </div>
         </form>
          </div>
  
  </body>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
            `);
});
// EventInfo, opcoes, orcamento, participantes, dataI, dataF
app.post("/evento", (req, res) => {
  const eventInfo = req.body.eventInfo;
  const opcoes = req.body.opcoes;
  const orcamento = req.body.orcamento;
  const participantes = req.body.participantes;
  const dataI = req.body.dataI;
  const dataF = req.body.dataF;

  dadosEventos.push({
    eventInfo: eventInfo,
    opcoes: opcoes,
    orcamento: orcamento,
    participantes: participantes,
    dataI: dataI,
    dataF: dataF,
  });
  res.redirect("/listaEventos");
});

app.get("/listaEventos", (req, res) => {
  res.write(`<html lang="pt-br">
            <head>
                <meta charset="utf-8">
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">

            </head>

            <body>
                <div class="container mt-5">
                
                <table class="table table-dark table-striped-columns">
                  <thead>
                    <tr>
                      <th scope= "col">Tipo de Evento</th>
                      <th scope= "col">Informações do Evento</th>
                      <th scope= "col">Orçamento</th>
                      <th scope= "col">Participantes Estimados</th>
                      <th scope= "col">Data inicial</th>
                      <th scope= "col">Data final</th>
                  </thead>
                  <tbody>`);

  for (let i = 0; i < dadosEventos.length; i++) {
    const evento = dadosEventos[i];
    res.write(`<tr>
        <td>${evento.opcoes}</td>
        <td>${evento.eventInfo}</td>
        <td>${evento.orcamento}</td>
        <td>${evento.participantes}</td>
        <td>${evento.dataI}</td>
        <td>${evento.dataF}</td>
      </tr>`);
  }

  res.write(`
    </tbody>
    </table>
    <a href="/" class="btn btn-success">Continuar cadastrando...</a>
    </div>
    </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>
        `);

  res.end();
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://${host}:${port}`);
});
