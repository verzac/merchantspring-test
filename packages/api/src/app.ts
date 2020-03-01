import express from 'express';
import logger from './utils/logger';
import cors from 'cors';
import healthCheck from './utils/healthCheck';
import productController from './controllers/product.controller';

const app = express();
const PORT_NUMBER = 8080;
app.use(cors);

app.get('/.ping', (req, res) => {
  res.send({
    message: 'Pong!',
  }).status(200);
});

app.get('/.health', async (req, res) => {
  let status: 'UP' | 'DOWN';
  try {
    await healthCheck();
    status = 'UP';
  } catch (e) {
    logger.error(e);
    status = 'DOWN';
  }
  res.send({
    status: status
  }).status(status === 'UP' ? 200 : 503);
});

app.get('/product-search', async (req, res) => {
  let keywords: string = req.query.keywords;
  if (!keywords) {
    res.send({
      'message': 'You must pass in the ?keywords query param (e.g. ?keywords=ipad).',
    }).status(400);
  }
  res.send(await productController.getProducts(keywords)).status(200);
});

app.listen(PORT_NUMBER, () => logger.info(`Server started. Listening at ${PORT_NUMBER}.`));
