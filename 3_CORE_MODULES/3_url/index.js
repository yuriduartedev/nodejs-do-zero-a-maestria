const url = require("url");
const address = "https://www.meusite.com.br/catalog?product=chair";
const parsedUrl = new url.URL(address);

console.log(parsedUrl);
