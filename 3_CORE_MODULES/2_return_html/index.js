const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello, server with HTML</h1><p>Testing refresh</p>");
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
