const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
  const urlInfo = url.parse(req.url, true);
  const { name } = urlInfo.query;

  if (name) {
    const nameNewLine = name + ",\r\n";

    fs.appendFile("file.txt", nameNewLine, (error, data) => {
      res.writeHead(302, {
        Location: "/",
      });
      res.end();
    });
  } else {
    fs.readFile("index.html", (error, data) => {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
