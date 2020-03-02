import express from 'express';
import logger from './utils/logger';
import cors from 'cors';
import healthCheck from './utils/healthCheck';
import productController from './controllers/product.controller';
import withErrorHandling from './utils/withErrorHandling';
import config from './config';
import getCsvConverter from './utils/getCsvConverter';

const app = express();
const PORT_NUMBER = config.portNumber;

// middlewares
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded());

// routes
app.get('/.ping', (req, res) => {
  logger.info('Ping!');
  return res.status(200).json({
    message: 'Pong!',
  });
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
  return res.status(status === 'UP' ? 200 : 503).json({
    status: status
  });
});

app.get('/product-search', withErrorHandling(async (req, res) => {
  let keywords: string | undefined = req.query.keywords;
  if (!keywords) {
    return res.json({
      'message': 'You must pass in the ?keywords query param (e.g. ?keywords=ipad).',
    }).status(400);
  }
  let csv: string | undefined = req.query.csv;
  let data = await productController.getProducts(keywords);
  if (csv === 'true') {
    res.setHeader('Content-Disposition', `attachment;filename=products-${keywords}.csv`)
    res.writeHead(200, { 'Content-Type': 'application/csv' });
    res.flushHeaders();
    let csvConverter = getCsvConverter();
    csvConverter.toOutput(res);
    csvConverter.input.push(JSON.stringify(data));
    csvConverter.input.push(null);
    return;
  }
  return res.json(data).status(200);
}));

// error handlers
app.use(function (err, req, res, next) {
  logger.error(err);
  if (res.headersSent) {
    return next(err);
  }
  return res.status(500).json({
    message: 'An unexpected error has occurred.'
  });
});

app.listen(PORT_NUMBER, () => logger.info(`Server started. Listening at ${PORT_NUMBER}.`));
