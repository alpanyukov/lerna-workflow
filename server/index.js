const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors(), bodyParser.json());

const port = process.env.PORT || 8080;

const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    message: 'Hello!!'
  });
});

app.use('/', router);

app.listen(port, () => {
  console.log(`🚀 Server listen ${port}`);
});
