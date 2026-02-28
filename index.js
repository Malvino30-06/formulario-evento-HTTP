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
  <div class="form-row m-b-55">
    <form method="POST" action="/evento">
                <div class="name">Informações</div>
                <div class="value">
                  <div class="input-group-desc">
                    <textarea
                      class="input--style-5"
                      rows="4"
                      name="eventInfo"
                      style="padding: 12px; line-height: 1.4"
                    >
                    </textarea>
                    <label class="label--desc">informações do Evento</label>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="name">Tipo</div>
                <div class="value">
                  <div class="input-group">
                    <div class="rs-select2 js-select-simple select--no-search">
                      <select name="opcoes">
                        <option disabled="disabled" selected="selected">
                          Escolha uma opção
                        </option>
                        <option>Social</option>
                        <option>Corporativo</option>
                        <option>Cultural</option>
                        <option>Acadêmico</option>
                        <option>Esportivo</option>
                        <option>Diverso</option>
                      </select>
                      <div class="select-dropdown"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="name">Orçamento</div>
                <div class="value">
                  <div class="input-group">
                    <input
                      class="input--style-5"
                      type="text"
                      name="orcamento"
                      id="valor"
                      step="100.00"
                      placeholder="100.00"
                    />
                    <label class="label--desc"><R1></R1></label>
                  </div>
                </div>
              </div>

              <div class="form-row">
                <div class="name">Participantes</div>
                <div class="value">
                  <div class="input-group">
                    <input
                      class="input--style-5"
                      type="number"
                      name="participantes"
                    />
                    <label class="label--desc"
                      >Número estimado de participantes</label
                    >
                  </div>
                </div>
              </div>

              <div class="form-row m-b-55">
                <div class="name">Data do Evento</div>
                <div class="value">
                  <div class="row row-space">
                    <div class="col-2">
                      <div class="input-group-desc">
                        <input
                          class="input--style-5"
                          type="date"
                          name="dataI"
                        />
                        <label class="label--desc">Inicio</label>
                      </div>
                    </div>
                    <div class="col-2">
                      <div class="input-group-desc">
                        <input
                          class="input--style-5"
                          type="date"
                          name="dataF"
                        />
                        <label class="label--desc">Fim</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                <button class="btn btn--radius-2 btn--red" type="submit">
                  Registrar
                </button>
              </div>
      </form>
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
                
                <table class="table table-striped table-hover">
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
    <a href="/" class="btn btn-primary">Continuar cadastrando...</a>
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
