const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/hello') {
    const name = req.headers.name || 'coopers';
    console.log(`req name: ${name}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello, ${name}`);
  } else {
    res.statusCode = 404;
    res.end();
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
