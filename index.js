const app = require("express")();

app.get("/", (req, res) => {
  res.send({
    hi: "there"
  });
});

app.get("/nissim", (req, res) => {
  res.send({
    name: "Nissim"
  });
});

app.listen(process.env.PORT || 5000);
