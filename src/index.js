const http = require("http");
const { listUsers } = require("./controllers/userController");

const routes = require("./routes");

const serve = http.createServer((req, res) => {
  console.log(`Request: ${req.method} | Endpoint: ${req.url}`);

  const router = routes.find((routerObj) => {
    routerObj.endpoint === req.url && routerObj.method === req.method;
  });

  if (router) {
    router.handler(req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end(() => `Cannot ${req.method} ${req.url}`);
  }
});

serve.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
