const express = require('express');
const app = express();

app.use(express.static(__dirname + '/web/views')); // html
app.use(express.static(__dirname + '/web/public')); // js, css, images

app.listen(process.env.PORT || 5000);

app.get('/', (req, res) => {
  res.sendFile('index.html');
});