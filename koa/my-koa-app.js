const Koa = require("koa");

const fs = require("fs");
const https = require("https");
const forceHTTPS = require("koa-force-https");

const json = require("koa-json");

const options = {
  key: fs.readFileSync("ssl-certificate.key"),
  cert: fs.readFileSync("ssl-certificate.crt"),
};

const app = new Koa();

app.use(json());
app.use(forceHTTPS());

// response
app.use(async (context) => (context.body = "Hello World"));

https.createServer(options, app.callback()).listen(443);
app.listen(3000, () => console.log("Server Started..."));
