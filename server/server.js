import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import path from "path";
import request from "request";
// Our loader - this basically acts as the entry point for each page load

// Create our express app using the port optionally specified
const app = express();
const PORT = 9001;

// Compress, parse, log, and raid the cookie jar
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.post("/list", (req, res) => {
   const { keyword, page = 1 } = req.body;
   const options = {
      method: "POST",
      url: `https://chatsticker.com?apiKey=CbAT3TnhoE0FXAqv61hcSxNQrqlZHK0KKEAP9Vl1Yn329l6fVIftXVWKO0rIKuXPN8MdraQLb6aN4kFrMyR7CjE67PGPfZPz4830VgmxMRZbI5YxMRH8ZtW2Z9AbjhdI&term=${keyword}&page=${page}`,
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
      }
   };
   request(options, (err, response) => {
      res.json(JSON.parse(response.body));
   });
});

// Set up homepage, static assets, and capture everything else
app.use(express.static(path.resolve(__dirname, "../build")));
app.use("/", (req, res) => {
   res.sendFile(path.join(__dirname + "../build"));
});
app.listen(PORT, console.log(`App listening on port ${PORT}!`));

app.on("error", error => {
   if (error.syscall !== "listen") {
      throw error;
   }

   const bind = typeof PORT === "string" ? `Pipe ${PORT}` : `Port ${PORT}`;

   switch (error.code) {
      case "EACCES":
         console.error(`${bind} requires elevated privileges`);
         process.exit(1);
         break;
      case "EADDRINUSE":
         console.error(`${bind} is already in use`);
         process.exit(1);
         break;
      default:
         throw error;
   }
});
