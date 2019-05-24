const app = require("express")();
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");

require("./models/User");
require("./services/passport");

mongoose
  .connect(require("./config/keys").mongoURI, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // in ms
    keys: [require("./config/keys").cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

app.listen(process.env.PORT || 5000); //We tell node to listen to this port for the incoming requests
