import express from 'express';
import logger from './utils/logger';

const app = express();
const PORT_NUMBER = 8080;

app.get('/.ping', (req, res) => {
  res.send({
    message: 'Pong!',
  }).status(200);
});


app.listen(PORT_NUMBER, () => logger.info(`Server started. Listening at ${PORT_NUMBER}.`));
